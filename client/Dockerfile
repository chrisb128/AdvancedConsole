FROM httpd:2.4-alpine

ARG USE_SSL

COPY apache.conf /usr/local/apache2/conf/apache.conf
RUN echo "Include /usr/local/apache2/conf/apache.conf" \
    >> /usr/local/apache2/conf/httpd.conf

COPY ./build /usr/local/apache2/htdocs/client/

RUN mkdir -p /var/log/apache2/
RUN mkdir -p /etc/ssl/

EXPOSE 80
EXPOSE 443