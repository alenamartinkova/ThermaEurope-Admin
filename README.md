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
- Run `make code-check` within `thermaeurope_app-admin` docker container.
- It runs all code checks (PHP, JS).
- According to errors you get you can run this commands to auto-fix some of them.
  - `make eslint-fix`
  - `make pint-fix`

## Tests
- Run `make test` within `thermaeurope_app-admin` docker container.

## Xdebug
- Xdebug is already installed in local docker container.
- You just need to configure your IDE to listen.
- Complete manual how to configure PHPStorm is here: https://www.youtube.com/watch?v=4opFac50Vwo
