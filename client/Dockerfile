FROM httpd:2.4-alpine

COPY apache.conf /usr/local/apache2/conf/apache.conf
COPY apache.ssl.conf /usr/local/apache2/conf/apache.ssl.conf

ARG USE_SSL=1
ENV USE_SSL=${USE_SSL}

RUN if [ "${USE_SSL}" -eq "1" ]; then echo "Include /usr/local/apache2/conf/apache.ssl.conf" >> /usr/local/apache2/conf/httpd.conf; fi

RUN if [ "${USE_SSL}" -eq "0" ]; then echo "Include /usr/local/apache2/conf/apache.conf" >> /usr/local/apache2/conf/httpd.conf; fi


RUN mkdir -p /var/www/client/
RUN chmod -R 755 /var/www

COPY ./build /var/www/client/

RUN mkdir -p /var/log/apache2/
RUN if [ "${USE_SSL}" -eq "1" ]; then mkdir -p /etc/ssl/; fi

EXPOSE 80
EXPOSE 443