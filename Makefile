export UID = $(shell id -u)
export GID = $(shell id -g)

ifneq (,$(wildcard .env))
include .env
export $(shell sed 's/=.*//' .env)
endif

default: help

help:						## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(firstword $(MAKEFILE_LIST)) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: 								## Install all dependencies for all packages
	corepack enable yarn
	yarn install
	yarn workspace @bibcnrs/bib-api prisma generate

env-copy:
	@cp -n docker-compose.dev.env.sample docker-compose.dev.env

migrate-dev: env-copy					## Run migrations in development environment
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml run --rm bib-api yarn prisma migrate dev

migrate-dev-create-only: env-copy 		## Create migration file in development environment, need to apply it with make migrate afterwards
	docker-compose --env-file docker-compose.dev.env -f docker-compose.dev.yml run --rm bib-api yarn prisma migrate dev --create-only

reset-db: env-copy 						## Reset the database and apply all migration
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml run --rm bib-api yarn prisma migrate reset

start: env-copy							## Start stack in development mode
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml up -d --build --remove-orphans


stop: env-copy							## Stop stack
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml down 

logs: env-copy							## Show logs
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f

logs-front: env-copy					## Show logs for front
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f bib-front

logs-api: env-copy					## Show logs for api
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f bib-api

logs-admin: env-copy					## Show logs for admin
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f bib-admin

lint-apply: 							## Apply lint for each projects
	yarn lint:apply

lint-check: 							## Check lint for each projects
	yarn lint:check

docker-build-api: env-copy				## Build docker image for api
	docker build -t bib-api --progress=plain --no-cache -f ./ops/api/Dockerfile .

bib-old-add-admin-dev: env-copy			## create admin user
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml run --rm bib-api-old node bin/addAdminUser.js

