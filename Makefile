export UID = $(shell id -u)
export GID = $(shell id -g)

ifneq (,$(wildcard .env))
include .env
export $(shell sed 's/=.*//' .env)
endif

default: help

help:						## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(firstword $(MAKEFILE_LIST)) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: 					## Install all dependencies for all packages
	yarn install
	yarn workspace @bibcnrs/bib-api prisma generate

migrate-dev: 				## Run migrations in development environment
	docker compose -f docker-compose.dev.yml run --rm bib-api yarn prisma migrate dev

migrate-dev-create-only: 	## Create migration file in development environment, need to apply it with make migrate afterwards
	docker-compose -f docker-compose.dev.yml run --rm bib-api yarn prisma migrate dev --create-only

reset-db: 					## Reset the database and apply all migration
	docker compose -f docker-compose.dev.yml run --rm bib-api yarn prisma migrate reset

start: 						## Start stack in development mode
	docker compose -f docker-compose.dev.yml up -d --build --remove-orphans

stop: 						## Stop stack
	docker compose -f docker-compose.dev.yml down 

lint-apply: 				## Apply lint for each projects
	yarn lint:apply

lint-check: 				## Check lint for each projects
	yarn lint:check

docker-build-api: 			## Build docker image for api
	docker build -t bib-api --progress=plain --no-cache -f ./ops/api/Dockerfile .