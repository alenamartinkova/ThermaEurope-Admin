# Run this commands inside thermaeurope_app-admin docker container

vite:
	npm run dev

ide-helper:
	composer run ide-helper

eslint:
	npx eslint resources/js/*

eslint-fix:
	npx eslint resources/js/* --fix

missing-translations:
	php artisan translation:missing --lang=en

unused-translations:
	php artisan translation:unused --lang=en

check:
	make pint
	make phpstan
	npx tsc --noEmit
	make eslint
	make missing-translations | grep 'No missing translation' || echo 'Some translations are missing. Run `make missing-translations` and add them.' >&2 | exit 1

pint:
	./vendor/bin/pint --test

pint-fix:
	./vendor/bin/pint

phpstan:
	./vendor/bin/phpstan analyse

test:
	composer dump-autoload
	php artisan test

generate-migrations:
	php artisan optimize:clear
	find ./tests/database/migrations -name "*.php" -type f -delete
	php artisan migrate:generate --squash --default-index-names -n --path=tests/database/migrations

# Run this commands outside thermaeurope_app-admin docker container

cypress-run:
	npx cypress run

cypress-open:
	npx cypress open
