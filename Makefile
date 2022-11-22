ide-helper:
	composer run ide-helper

eslint:
	npx eslint resources/js/*

eslint-fix:
	npx eslint resources/js/* --fix

code-check:
	tsc --noEmit
	make eslint

pint:
	./vendor/bin/pint --test

pint-fix:
	./vendor/bin/pint

test:
	composer dump-autoload
	php artisan test