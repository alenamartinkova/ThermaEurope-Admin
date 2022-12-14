## Spanamo - Admin

## Installation - localhost
- Checkout the project and run according to https://gitlab.com/moravio/thermaeurope-docker.
- Add `127.0.0.1 admin.thermaeurope.l` into `/etc/hosts`.
- Exec admin docker container (run all commands within this docker container).
  - `docker exec -it thermaeurope_app-admin bash`
- Run `composer install`.
- Run `npm ci`.
- Copy `.env.example` to `.env`

## Serve JS and CSS
- Run `make vite` within `thermaeurope_app-admin` docker container.
- It will watch and server JS and CSS styles necessary for FE.
- This step is essential to run FE correctly.

## Code Check
- Run `make check` within `thermaeurope_app-admin` docker container.
- It runs all code checks (PHP, JS).
- According to errors you can run `make fix` to auto-fix some of them.

## CSS
- We use SASS. 
- CSS styles are build using Vite together with JS.
  - Use `make vite` to watch *.scss files changes
- Read this guideline https://sass-guidelin.es/ to understand style coding standards
  - Run `make stylelint` to check it.
  - It's also part of `make check` command.

## Tests
- Run `make test` within `thermaeurope_app-admin` docker container.

## Cypress tests
- This tests are available only outside the docker dontainer, so you need `npx` to run it.
- To run your tests successfully, you admin app must run on URL: `http://admin.thermaeurope.l/`
  - Don't forget to run Vite: `make vite`.
- Run `make cypress-run` to run the tests in console and see results.
- Run `make cypress-open` to open the Cypress app and run tests there.

## Generate migrations for tests
- All DB migrations are stored in https://github.com/Moravio/ThermaEurope.
- We need the DB structure for tests.
- Run `make generate-migrations` to generate migrations from your local database.
- This migrations will be used for tests

## Xdebug
- Xdebug is already installed in local docker container.
- You just need to configure your IDE to listen.
- Complete manual how to configure PHPStorm is here: https://www.youtube.com/watch?v=4opFac50Vwo
