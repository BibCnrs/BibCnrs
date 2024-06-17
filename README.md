# BibCnrs

<!-- BIB LOGO -->
<p align="center">
  <img src="
https://bib.cnrs.fr/wp-content/uploads/2018/04/bibcnrs-logo-visite.png" alt="BibCnrs Logo" width="200" />

This is a monorepo containing several packages for the BibCnrs project. Each package serves a different purpose and can be used independently.

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />

## Packages

### bib-admin

This is the admin package for our project. It uses the tool [react-admin](https://github.com/marmelab/react-admin) and allows managing access rights by institute, unit, individual to documentary resources exposed through [BibEzProxy](https://github.com/BibCnrs/BibEzProxy).

### api

This is the API package for our project. It provides the backend services and data management for the other packages.

### front

This is the frontend package for our project. It provides the user interface and interacts with the `api` package to fetch and display data.

## Installation

To install all dependencies, run:

```sh
make install
```

## Start development mode

Requires Docker Compose > v2.22.0

```sh
make start-dev  # Start all services
make stop-dev   # Stop all services
```

## Test

Requires Docker Compose > v2.22.0

```sh
make test             # Runs all tests and exits

# OR

make test-api-watch   # Runs API tests in watch mode
```

## Seed DB

Warn: `seed-db` script will erase all your data from your local database.

To init your db, you will need :

- To install [`psql`](https://www.postgresql.org/download/) CLI
- To copy preprod export to `data/seed.sql`
- Run `make seed-db`

## Usage

To start all packages in development mode, run:

```sh
make start
```

To view different logs, run:

```sh
make logs-api
make logs-admin
make logs-front

make logs
```

## Deploy

First you wil need to buil all containers

```sh
BIBAPI_VERSION=latest make build-api
BIBAPI_HOST="http://localhost:3000/api" BIBFRONT_VERSION=latest make build-front
BIBAPI_HOST="http://localhost:3000/api" BIBADMIN_VERSION=latest make build-admin

# OR one-liner

BIBAPI_HOST="http://localhost:3000/api" BIBAPI_VERSION=latest BIBFRONT_VERSION=latest BIBADMIN_VERSION=latest make build

```

## Makefile

The Makefile at the root of the project contains several commands to help you manage the packages. You can run `make help` to see all available commands.

```sh
make help
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[CeCILL](http://www.cecill.info)
