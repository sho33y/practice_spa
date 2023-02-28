FROM httpd:alpine

COPY extra/httpd-php-fpm.conf /usr/local/apache2/conf/extra/httpd-php-fpm.conf

RUN sed -i "s/#LoadModule\ rewrite_module/LoadModule\ rewrite_module/" /usr/local/apache2/conf/httpd.conf;
RUN echo 'Include conf/extra/httpd-php-fpm.conf' >> /usr/local/apache2/conf/httpd.conf