export UID = $(shell id -u)
export GID = $(shell id -g)

# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := restore-db _restore_db restore-db-dev _restore_db_dev
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
	yarn workspace @bibcnrs/bib-api prisma generate

install-immutable: 						## Install all dependencies for all packages
	yarn install --immutable
	yarn workspace @bibcnrs/bib-api prisma generate

env-mkdirs:								## Create storage directories
	@mkdir -p \
		../storage/backups \
		../storage/logs \
		../storage/postgresql \
		../storage/uploads

env-copy: env-mkdirs					## Copy env files if they don't exist
	@cp -n docker-compose.dev.env.sample 	docker-compose.dev.env
	@cp -n docker-compose.prod.env.sample 	docker-compose.prod.env

migrate-dev: env-copy					## Run migrations in development environment
	docker compose \
		--env-file docker-compose.dev.env \
		-f docker-compose.dev.yml \
		run \
		--user $(UID):$(GID) \
		--volume $(PWD)/packages/bib-api/prisma:/app/packages/bib-api/prisma \
		--rm bib-api \
		yarn workspace @bibcnrs/bib-api run prisma migrate dev

migrate-dev-create-only: env-copy 		## Create migration file in development environment, need to apply it with make migrate afterwards
	docker compose \
		--env-file docker-compose.dev.env \
		-f docker-compose.dev.yml \
		run \
		--user $(UID):$(GID) \
		--volume $(PWD)/packages/bib-api/prisma:/app/packages/bib-api/prisma \
		--rm bib-api \
		yarn workspace @bibcnrs/bib-api run prisma migrate dev --create-only

dev-reset-db: env-copy 						## Reset the database and apply all migration
	docker compose \
		--env-file docker-compose.dev.env \
		-f docker-compose.dev.yml \
		run \
		--user $(UID):$(GID) \
		--volume $(PWD)/packages/bib-api/prisma:/app/packages/bib-api/prisma \
		--rm bib-api \
		yarn workspace @bibcnrs/bib-api run prisma migrate reset

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
		--wait bib-db

	docker exec bibcnrs-bib-db-1 psql -U postgres bibcnrs -f /backups/seed.sql

	docker compose \
		--env-file docker-compose.dev.env \
		-f docker-compose.dev.yml \
		run \
		--user $(UID):$(GID) \
		--volume $(PWD)/packages/bib-api/prisma:/app/packages/bib-api/prisma \
		--rm bib-api \
		yarn workspace @bibcnrs/bib-api run prisma migrate resolve --applied 0_init

start-dev: env-copy						## Start stack in development mode
	docker compose \
		--env-file docker-compose.dev.env \
		-f docker-compose.dev.yml \
		up \
		--watch \
		--build \
		--remove-orphans \
		--no-attach=bib-db \
		--no-attach=bib-mail \
		--no-attach=bib-proxy \
		--no-attach=bib-redis

stop-dev: env-copy						## Stop stack
	docker compose --env-file docker-compose.prod.env -f docker-compose.prod.yml down
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml down
	docker compose -f docker-compose.test.yml down

dev-copy-uploads:						## Copy files from input directory to uploads, usage: COMMAND_ARGS='./uploads' make dev-copy-uploads
ifdef COMMAND_ARGS
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml up bib-proxy -d 
	docker cp $(COMMAND_ARGS)/. bibcnrs-bib-proxy-1:/usr/share/nginx/html/files
else
	@echo 'Please specify an input directory to copy to uploads'
endif


test: test-api							## Run tests for all packages

test-api:								## Run tests for bib-api
	docker compose \
		-f docker-compose.test.yml \
		run \
		--build \
		--rm bib-api-test \
		yarn workspace @bibcnrs/bib-api run test

test-api-watch:							## Run tests for bib-api in watch mode
	docker compose \
		-f docker-compose.test.yml \
		up \
		--build \
		--remove-orphans \
		--watch \
		bib-db-test \
		bib-api-test \
		--no-attach=bib-db-test \
		--no-log-prefix

logs: env-copy							## Show logs
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f

logs-front: env-copy					## Show logs for front
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f bib-front

logs-api: env-copy						## Show logs for api
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f bib-api

logs-admin: env-copy					## Show logs for admin
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f bib-admin
	
typecheck:								## Run typecheck for all packages
	yarn workspaces foreach --all --parallel --verbose run typecheck

lint-apply: 							## Apply lint for each projects
	yarn run biome check --apply * **/* 

lint-check: 							## Check lint for each projects
	yarn run biome check * **/*

build:									## Build all docker images								
	$(MAKE) build-api
	$(MAKE) build-front
	$(MAKE) build-admin

build-api:								## Build docker image for api args: <BIBAPI_VERSION> build bibcnrs/api:<BIBAPI_VERSION> docker image default <BIBAPI_VERSION> to latest
	docker build \
		-f ./ops/bib-api/Dockerfile \
		--progress=plain \
		--no-cache \
		--build-arg http_proxy \
		--build-arg https_proxy \
		-t 'vxnexus-registry.intra.inist.fr:8083/bibcnrs/api:${BIBAPI_VERSION}' \
		.

build-front:
	docker build \
		-f ./ops/bib-front/Dockerfile \
		--progress=plain \
		--no-cache \
		-t 'vxnexus-registry.intra.inist.fr:8083/bibcnrs/front:${BIBFRONT_VERSION}' \
		--build-arg BIBAPI_HOST=${BIBAPI_HOST} \
		.

build-admin:
	docker build \
		-f ./ops/bib-admin/Dockerfile \
		--progress=plain \
		--no-cache \
		-t 'vxnexus-registry.intra.inist.fr:8083/bibcnrs/admin:${BIBADMIN_VERSION}' \
		--build-arg BIBAPI_HOST=${BIBAPI_HOST} \
		.
# Production
start: env-mkdirs						## Start stack in production mode
	docker compose -f docker-compose.prod.yml up -d

stop:									## Stop stack in production mode
	docker compose -f docker-compose.prod.yml down

start-prod: stop-dev					## Start stack in production mode with local env
	docker compose \
		--env-file docker-compose.prod.env \
		-f docker-compose.prod.yml \
		up

deploy-dev:
	 ssh bibcnrs@vdbibcnrs-ext.inist.fr 'cd ~/bibcnrs-v4  && git pull && make build && make stop start && docker restart bibrp_rp_1'

prod-init-db: env-mkdirs				## Initialize the database with seed data in production
	docker compose -f docker-compose.prod.yml up -d --wait bibcnrs-api-postgres
	docker exec bibcnrs-api-postgres psql -U $(POSTGRES_USER) $(POSTGRES_DB) -f /backups/seed.sql
	docker compose -f docker-compose.prod.yml run --rm bibcnrs-api yarn workspace @bibcnrs/bib-api run prisma migrate resolve --applied 0_init

save-db: ## create postgres dump for prod database in backups directory with given name or default to current date
	docker exec bibcnrs-api-postgres bash -c 'PGPASSWORD=$$POSTGRES_PASSWORD pg_dump --username $$POSTGRES_USER $$POSTGRES_DB > /backups/$(shell date +%Y_%m_%d_%H_%M_%S).sql'

_pre_restore_db:
	docker compose -f docker-compose.prod.yml stop
	docker compose -f docker-compose.prod.yml start bibcnrs-api-postgres

_post_restore_db:
	docker compose -f docker-compose.prod.yml stop

_restore_db: save-db
	docker exec bibcnrs-api-postgres bash -c 'PGPASSWORD=$$POSTGRES_PASSWORD dropdb --username $$POSTGRES_USER $$POSTGRES_DB'
	docker exec bibcnrs-api-postgres bash -c 'PGPASSWORD=$$POSTGRES_PASSWORD createdb --username $$POSTGRES_USER $$POSTGRES_DB' || true
	docker exec bibcnrs-api-postgres bash -c 'psql -f /backups/$(COMMAND_ARGS) postgres://$$POSTGRES_USER:$$POSTGRES_PASSWORD@bibcnrs-api-postgres:5432/$$POSTGRES_DB'

restore-db:  ## restore a given dump to the postgres database list all dump if none specified
ifdef COMMAND_ARGS
	@make _pre_restore_db
	@make _restore_db $(COMMAND_ARGS)
	@make _post_restore_db_dev
else
	echo 'please specify backup to restore':
	@ls -h ./backups
endif
