FROM mongo:latest

RUN mkdir -p /usr/local/mongodb/data
RUN mkdir -p /usr/local/mongodb/log

COPY ./mongod.conf /etc/mongod.conf
COPY ./init.js /docker-entrypoint-initdb.d/
