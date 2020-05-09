FROM node:10

WORKDIR /var/jenkins_home

ENV DOCKERVERSION=18.03.1-ce
RUN curl -fsSLO https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKERVERSION}.tgz \
  && tar xzvf docker-${DOCKERVERSION}.tgz --strip 1 \
                 -C /usr/local/bin docker/docker \
  && rm docker-${DOCKERVERSION}.tgz

RUN useradd jenkins --shell /bin/bash --create-home
RUN groupadd docker
RUN usermod -aG docker jenkins 
USER jenkins