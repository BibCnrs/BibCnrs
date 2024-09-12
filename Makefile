export UID = $(shell id -u)
export GID = $(shell id -g)

# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := restore-db _restore_db create-test-alert-dev create-test-alert
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
    # use the rest as arguments for the command
    COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
    # ...and turn them into do-nothing targets
    $(eval $(COMMAND_ARGS):;@:)
endif

default: help

help:						## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(firstword $(MAKEFILE_LIST)) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: 								## Install all dependencies for all packages
	yarn install
	yarn workspace @bibcnrs/e2e run playwright install
	yarn workspace @bibcnrs/api prisma generate

install-immutable: 						## Install all dependencies for all packages
	yarn install --immutable
	yarn workspace @bibcnrs/api prisma generate

env-mkdirs:								## Create storage directories
	@mkdir -p \
		../storage/backups \
		../storage/logs \
		../storage/postgresql \
		../storage/uploads \
		../storage/shibboleth/log \
		../storage/ingress

env-copy: env-mkdirs					## Copy env files if they don't exist
	@cp -n docker-compose.dev.env.sample 	docker-compose.dev.env || true
	@cp -n docker-compose.prod.env.sample 	docker-compose.prod.env || true

migrate-dev: env-copy					## Run migrations in development environment
	docker compose \
		--env-file docker-compose.dev.env \
		-f docker-compose.dev.yml \
		run \
		--user $(UID):$(GID) \
		--volume $(PWD)/packages/api/prisma:/app/packages/api/prisma \
		--rm api \
		yarn workspace @bibcnrs/api run prisma migrate dev

migrate-dev-create-only: env-copy 		## Create migration file in development environment, need to apply it with make migrate afterwards
	docker compose \
		--env-file docker-compose.dev.env \
		-f docker-compose.dev.yml \
		run \
		--user $(UID):$(GID) \
		--volume $(PWD)/packages/api/prisma:/app/packages/api/prisma \
		--rm api \
		yarn workspace @bibcnrs/api run prisma migrate dev --create-only

dev-reset-db: env-copy 						## Reset the database and apply all migration
	docker compose \
		--env-file docker-compose.dev.env \
		-f docker-compose.dev.yml \
		run \
		--user $(UID):$(GID) \
		--volume $(PWD)/packages/api/prisma:/app/packages/api/prisma \
		--rm api \
		yarn workspace @bibcnrs/api run prisma migrate reset

dev-seed-db: env-copy						## Initialize the database with seed data
	docker compose \
		--env-file docker-compose.dev.env \
		-f docker-compose.dev.yml \
		down \
		--volumes

	sudo rm -rf ../storage/postgresql

	$(MAKE)	env-mkdirs
	
	docker compose \
		--env-file docker-compose.dev.env \
		-f docker-compose.dev.yml \
		up \
		--renew-anon-volumes \
		-d \
		--wait db

	docker exec bibcnrs-db-1 psql -U postgres bibcnrs -f /backups/seed.sql

	docker compose \
		--env-file docker-compose.dev.env \
		-f docker-compose.dev.yml \
		run \
		--user $(UID):$(GID) \
		--volume $(PWD)/packages/api/prisma:/app/packages/api/prisma \
		--rm api \
		yarn workspace @bibcnrs/api run prisma migrate resolve --applied 0_init

start-dev: env-copy						## Start stack in development mode
	docker compose \
		--env-file docker-compose.dev.env \
		-f docker-compose.dev.yml \
		up \
		--watch \
		--build \
		--remove-orphans \
		--no-attach=db \
		--no-attach=mail \
		--no-attach=proxy \
		--no-attach=redis

stop-dev: env-copy						## Stop stack
	docker compose --env-file docker-compose.prod.env -f docker-compose.prod.yml down
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml down
	docker compose -f docker-compose.test-e2e.yml down --volumes
	docker compose -f docker-compose.test.yml down

dev-copy-uploads:						## Copy files from input directory to uploads, usage: COMMAND_ARGS='./uploads' make dev-copy-uploads
ifdef COMMAND_ARGS
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml up proxy -d 
	docker cp $(COMMAND_ARGS)/. bibcnrs-proxy-1:/usr/share/nginx/html/files
else
	@echo 'Please specify an input directory to copy to uploads'
endif


test: test-api							## Run tests for all packages

test-front:								## Run tests for front
	docker compose \
		-f docker-compose.test.yml \
		run \
		--build \
		--rm front-test \
		yarn workspace @bibcnrs/front run test

test-front-watch:						## Run tests for front in watch mode
	docker compose \
		-f docker-compose.test.yml \
		up \
		--build \
		--remove-orphans \
		--watch \
		front-test \
		--no-attach=front-test \
		--no-log-prefix

test-api:								## Run tests for api
	docker compose \
		-f docker-compose.test.yml \
		run \
		--build \
		--rm api-test \
		yarn workspace @bibcnrs/api run test

test-api-watch:							## Run tests for api in watch mode
	docker compose \
		-f docker-compose.test.yml \
		up \
		--build \
		--remove-orphans \
		--watch \
		db-test \
		api-test \
		--no-attach=db-test \
		--no-log-prefix

logs: env-copy							## Show logs
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f

logs-front: env-copy					## Show logs for front
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f front

logs-api: env-copy						## Show logs for api
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f api

logs-admin: env-copy					## Show logs for admin
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f admin
	
typecheck:								## Run typecheck for all packages
	yarn workspaces foreach --all --parallel --verbose run typecheck

lint-apply: 							## Apply lint for each projects
	yarn run biome check --write * **/* 

lint-check: 							## Check lint for each projects
	yarn run biome check * **/*

build:									## Build all docker images								
	$(MAKE) build-api
	$(MAKE) build-front
	$(MAKE) build-admin

build-api:								## Build docker image for api args: <BIBAPI_VERSION> build bibcnrs/api:<BIBAPI_VERSION> docker image default <BIBAPI_VERSION> to latest
	docker build \
		-f ./packages/api/Dockerfile \
		--progress=plain \
		--no-cache \
		--build-arg http_proxy \
		--build-arg https_proxy \
		-t 'vxnexus-registry.intra.inist.fr:8083/bibcnrs/api:$(BIBAPI_VERSION)' \
		.

build-front:
	docker build \
		-f ./packages/front/Dockerfile \
		--progress=plain \
		--no-cache \
		-t 'vxnexus-registry.intra.inist.fr:8083/bibcnrs/front:$(BIBFRONT_VERSION)' \
		--build-arg BIBAPI_HOST=$(BIBAPI_HOST) \
		--build-arg MATOMO_TRACKER_URL=$(MATOMO_TRACKER_URL) \
		--build-arg MATOMO_SCRIPT_URL=$(MATOMO_SCRIPT_URL) \
		--build-arg MATOMO_SITE_ID=$(MATOMO_SITE_ID) \
		.

build-admin:
	docker build \
		-f ./packages/admin/Dockerfile \
		--progress=plain \
		--no-cache \
		-t 'vxnexus-registry.intra.inist.fr:8083/bibcnrs/admin:$(BIBADMIN_VERSION)' \
		--build-arg BIBAPI_HOST=$(BIBAPI_HOST) \
		.
# Production
start: env-mkdirs						## Start stack in production mode
	docker compose -f docker-compose.prod.yml up -d

stop:									## Stop stack in production mode
	docker compose -f docker-compose.prod.yml down

deploy-dev:
	 ssh bibcnrs@vdbibcnrs-ext.inist.fr 'cd ~/bibcnrs-v4 && git fetch --prune && git checkout main && git reset --hard origin/main && make build && make stop start'

prod-init-db: env-mkdirs				## Initialize the database with seed data in production
	docker compose -f docker-compose.prod.yml up -d --wait bibcnrs-api-postgres
	docker exec bibcnrs-api-postgres psql -U $(POSTGRES_USER) $(POSTGRES_DB) -f /backups/seed.sql
	docker compose -f docker-compose.prod.yml run --rm bibcnrs-api yarn workspace @bibcnrs/api run prisma migrate resolve --applied 0_init

save-db: ## create postgres dump for prod database in backups directory with given name or default to current date
	docker exec bibcnrs-db-1 bash -c 'PGPASSWORD=$$POSTGRES_PASSWORD pg_dump --username $$POSTGRES_USER $$POSTGRES_DB > /backups/$(shell date +%Y_%m_%d_%H_%M_%S).sql'

_pre_restore_db:
	docker compose -f docker-compose.prod.yml stop
	docker compose -f docker-compose.prod.yml start bibcnrs-api-postgres

_post_restore_db:
	docker compose -f docker-compose.prod.yml stop

_restore_db: 
	docker exec bibcnrs-db-1 bash -c 'PGPASSWORD=$$POSTGRES_PASSWORD dropdb --username $$POSTGRES_USER $$POSTGRES_DB'
	docker exec bibcnrs-db-1 bash -c 'PGPASSWORD=$$POSTGRES_PASSWORD createdb --username $$POSTGRES_USER $$POSTGRES_DB' || true
	docker exec bibcnrs-db-1 bash -c 'psql -f /backups/$(COMMAND_ARGS) postgres://$$POSTGRES_USER:$$POSTGRES_PASSWORD@bibcnrs-db-1:5432/$$POSTGRES_DB'

connect-db: ## Allow to connect to psql instance
	docker exec -it bibcnrs-db-1 bash -c 'psql postgres://$$POSTGRES_USER:$$POSTGRES_PASSWORD@bibcnrs-db-1:5432/$$POSTGRES_DB'

restore-db:  ## restore a given dump to the postgres database list all dump if none specified
ifdef COMMAND_ARGS
	@make _pre_restore_db
	@make _restore_db $(COMMAND_ARGS)
	@make _post_restore_db_dev
else
	echo 'please specify backup to restore':
	@ls -h ./backups
endif

test-e2e-start: stop-dev						## Start stack in test 2e2 mode
	docker compose \
		--env-file docker-compose.dev.env \
		-f docker-compose.test-e2e.yml \
		down \
		--volumes
	
	docker compose \
		--env-file docker-compose.dev.env \
		-f docker-compose.test-e2e.yml \
		up \
		--build \
		--detach \
		--wait

test-e2e-stop: stop-dev							## Stop stack in test 2e2 mode

test-e2e:										## Run e2e tests
	docker build --file ./packages/e2e/Dockerfile --tag bib-e2e .
	docker run --network host --rm bib-e2e

test-e2e-ci: 									## Run e2e tests in CI mode
	CI=1 yarn workspace @bibcnrs/e2e run test

test-e2e-install: install						## Install e2e dependencies
	yarn workspace @bibcnrs/e2e run playwright install --with-deps

test-e2e-ui: 									## Run e2e tests in UI mode locally
	yarn workspace @bibcnrs/e2e run test:ui

search-alert-dev: 								## Run search alert in dev mode
	docker exec bibcnrs-api-1 \
		yarn workspace @bibcnrs/api run command:searchAlert:dev

search-alert: 									## Run search alert in production mode
	docker exec bibcnrs-api \
		yarn workspace @bibcnrs/api run command:searchAlert

create-test-alert-dev: 							## Run create test alert in dev mode
	docker exec bibcnrs-api-1 \
		yarn workspace @bibcnrs/api run command:createAlertForTest:dev $(COMMAND_ARGS)

create-test-alert: 								## Run create test alert in production mode
	docker exec bibcnrs-api \
		yarn workspace @bibcnrs/api run command:createAlertForTest $(COMMAND_ARGS)

clear-history-dev:								## Clear search history entries older than 2 months in dev mode
	docker exec bibcnrs-api-1 \
		yarn workspace @bibcnrs/api run command:cleanOldHistoryEntries:dev

clear_history:									## Clear search history entries older than 2 months in production mode
	docker exec bibcnrs-api \
		yarn workspace @bibcnrs/api run command:cleanOldHistoryEntries
