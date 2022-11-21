pint:
	./vendor/bin/pint --test

pint-fix:
	./vendor/bin/pint

test:
    composer dump-autoload && php artisan test
