FROM node

RUN mkdir -p /srv/app/server
RUN useradd --create-home --home-dir /srv/app/server --shell /bin/bash consolesrv
RUN chown consolesrv:consolesrv /srv/app/server

COPY --chown=consolesrv:consolesrv ./dist /srv/app/server/
COPY --chown=consolesrv:consolesrv ./config.sample.json  /srv/app/server/config.json

EXPOSE 3030

USER consolesrv
WORKDIR /srv/app/server
CMD [ "node", "./server.js" ]