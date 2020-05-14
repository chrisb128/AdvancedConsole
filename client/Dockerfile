FROM httpd:2.4-alpine

COPY apache.conf /usr/local/apache2/conf/apache.conf
COPY apache.ssl.conf /usr/local/apache2/conf/apache.ssl.conf

ARG USE_SSL=1
ENV USE_SSL=${USE_SSL}

RUN if [ "${USE_SSL}" -eq "1" ]; then echo "Include /usr/local/apache2/conf/apache.ssl.conf" >> /usr/local/apache2/conf/httpd.conf; fi

RUN if [ "${USE_SSL}" -eq "0" ]; then echo "Include /usr/local/apache2/conf/apache.conf" >> /usr/local/apache2/conf/httpd.conf; fi

RUN cat /usr/local/apache2/conf/httpd.conf | tail

COPY ./build /usr/local/apache2/htdocs/client/

RUN mkdir -p /var/log/apache2/
RUN mkdir -p /etc/ssl/

EXPOSE 80
EXPOSE 443