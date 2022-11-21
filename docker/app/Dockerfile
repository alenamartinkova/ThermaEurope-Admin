FROM php:8.1-fpm as base

ENV TZ=UTC

# Set working directory
WORKDIR /var/www/thermaeurope-admin

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install dependencies
RUN apt-get update && apt-get -y install \
    build-essential \
    default-mysql-client \
    libzip-dev \
    libcurl4-openssl-dev pkg-config libssl-dev \
    vim \
    curl \
    libmpdec-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql zip exif pcntl

# Install decimal
RUN pecl install decimal
RUN docker-php-ext-enable decimal

COPY ./docker/app/app.ini $PHP_INI_DIR/conf.d/
COPY ./docker/php/conf.d/error_reporting.ini $PHP_INI_DIR/conf.d/error_reporting.ini


CMD ["/bin/sh", "-c", "php-fpm"]

########################################################################################################################
FROM base as localhost

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Xdebug
#COPY ./docker/php/conf.d/xdebug.ini $PHP_INI_DIR/conf.d/docker-php-ext-xdebug.ini

#RUN pecl install xdebug
#RUN docker-php-ext-enable xdebug

########################################################################################################################
FROM base as production

RUN docker-php-ext-configure opcache --enable-opcache \
    && docker-php-ext-install opcache

COPY ./docker/app/opcache.ini $PHP_INI_DIR/conf.d/

# Copy existing application directory permissions
COPY --chown=www-data:www-data . /var/www/thermaeurope

RUN chgrp -R www-data storage bootstrap/cache && \
    chmod -R g+w storage bootstrap/cache

# Installing Composer
RUN composer install --optimize-autoloader --no-interaction --no-progress

########################################################################################################################
