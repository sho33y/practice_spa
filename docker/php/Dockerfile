ARG PHP_VERSION
FROM php:${PHP_VERSION}-fpm-alpine

# 必要なパッケージとphpモジュールをインストール
RUN apk --no-cache add \
        icu-dev \
        freetype-dev \
        libjpeg-turbo-dev \
        libpng-dev \
        libxml2-dev \
        libzip-dev \
        oniguruma-dev\
        vim \
        zlib-dev \
    ; \
    docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
    ; \
    docker-php-ext-install -j "$(nproc)" \
        bcmath \
        gd \
        intl \
        mbstring \
        pdo_mysql\
        xml \
        zip \
    ;

# composerインストール
COPY --from=composer /usr/bin/composer /usr/bin/composer

# php.ini設置
COPY conf.d/php.ini /usr/local/etc/php/conf.d/php.ini