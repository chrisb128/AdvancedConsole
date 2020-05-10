FROM node:10

WORKDIR /var/jenkins_home

ARG DEPLOY_ID_KEY_LOCATION
ENV DEPLOY_ID_KEY_LOCATION=${DEPLOY_ID_KEY_LOCATION}


ENV DOCKERVERSION=18.03.1-ce
RUN curl -fsSLO https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKERVERSION}.tgz \
  && tar xzvf docker-${DOCKERVERSION}.tgz --strip 1 \
                 -C /usr/local/bin docker/docker \
  && rm docker-${DOCKERVERSION}.tgz