FROM mongo:latest

ARG DB_USER=statusweb
ARG DB_PASS=statusweb

RUN mkdir -p /usr/local/mongodb/data
RUN mkdir -p /usr/local/mongodb/log

COPY ./mongod.conf /etc/mongod.conf
COPY ./init.js /docker-entrypoint-initdb.d/

RUN sed -i '1s/^/var DB_PASS="'$DB_PASS'";\n/' /docker-entrypoint-initdb.d/init.js
RUN sed -i '1s/^/var DB_USER="'$DB_USER'";\n/' /docker-entrypoint-initdb.d/init.js