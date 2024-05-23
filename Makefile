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
	yarn install
	yarn workspace @bibcnrs/bib-api prisma generate

install-immutable: 						## Install all dependencies for all packages
	yarn install --immutable
	yarn workspace @bibcnrs/bib-api prisma generate

env-copy:
	@cp -n docker-compose.dev.env.sample docker-compose.dev.env

migrate-dev: env-copy					## Run migrations in development environment
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml run --rm bib-api yarn prisma migrate dev

migrate-dev-create-only: env-copy 		## Create migration file in development environment, need to apply it with make migrate afterwards
	docker-compose --env-file docker-compose.dev.env -f docker-compose.dev.yml run --rm bib-api yarn prisma migrate dev --create-only

reset-db: env-copy 						## Reset the database and apply all migration
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml run --rm bib-api yarn prisma migrate reset

init-db: 								## Initialize the database with seed data
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml down --volumes
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml up --renew-anon-volumes -d --wait bib-db
	PGPASSWORD=S3cr3t psql -h localhost -U postgres bibcnrs -f data/seed.sql
	docker compose -f docker-compose.dev.yml run --build --rm bib-api yarn run prisma migrate resolve --applied 0_init

start: env-copy							## Start stack in development mode
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml up -d --build --remove-orphans

stop: env-copy							## Stop stack
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml down 
	docker compose -f docker-compose.test.yml down

test: test-api							## Run tests for all packages

test-api:								## Run tests for bib-api
	docker compose -f docker-compose.test.yml run --build --rm bib-api-test yarn test

logs: env-copy							## Show logs
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f

logs-front: env-copy					## Show logs for front
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f bib-front

logs-api: env-copy					## Show logs for api
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f bib-api

logs-admin: env-copy					## Show logs for admin
	docker compose --env-file docker-compose.dev.env -f docker-compose.dev.yml logs -f bib-admin
	
typecheck:								## Run typecheck for all packages
	yarn workspaces foreach --all --parallel --verbose run typecheck

lint-apply: 							## Apply lint for each projects
	yarn run biome check --apply * **/* 

lint-check: 							## Check lint for each projects
	yarn run biome check * **/*

docker-build-api: env-copy				## Build docker image for api
	docker build -t bib-api --progress=plain --no-cache -f ./ops/api/Dockerfile .
