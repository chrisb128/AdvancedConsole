FROM node:10-alpine

RUN apk add --no-cache python make g++

RUN mkdir -p /srv/app/server
RUN adduser consolesrv --home /srv/app/server --shell /bin/bash --disabled-password consolesrv
RUN chown consolesrv:consolesrv /srv/app/server

COPY --chown=consolesrv:consolesrv ./dist /srv/app/server/
RUN chmod -R 744 /srv/app/server

EXPOSE 3030

USER consolesrv
WORKDIR /srv/app/server
CMD [ "node", "./server.js" ]