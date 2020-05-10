scp -C -i ${DEPLOY_ID_KEY_LOCATION} ./out/storage.zip chris@status.chrisb.info:~/release/storage.zip
scp -C -i ${DEPLOY_ID_KEY_LOCATION} ./out/api.zip chris@status.chrisb.info:~/release/api.zip
scp -C -i ${DEPLOY_ID_KEY_LOCATION} ./out/client.zip chris@status.chrisb.info:~/release/client.zip
ssh -i ${DEPLOY_ID_KEY_LOCATION} chris@status.chrisb.info \
  docker load release/storage.zip \
  && docker load release/api.zip \
  && docker load release/client.zip \
  && docker-compose -f docker/docker-compose.yml down \
  && docker-compose -f docker/docker-compose.yml up