FROM httpd:2.4-alpine

COPY apache.conf /usr/local/apache2/conf/apache.conf
RUN echo "Include /usr/local/apache2/conf/apache.conf" \
    >> /usr/local/apache2/conf/httpd.conf

COPY ./build /usr/local/apache2/htdocs/client/

RUN mkdir /var/log/apache2/

EXPOSE 80