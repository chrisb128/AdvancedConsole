#!/bin/sh

scp -Crq -i $DEPLOY_ID_KEY_LOCATION ./out/ chris@status.chrisb.info:/tmp/advanced-console/
ssh -i $DEPLOY_ID_KEY_LOCATION chris@status.chrisb.info docker load -i /tmp/advanced-console/out/storage.zip
ssh -i $DEPLOY_ID_KEY_LOCATION chris@status.chrisb.info docker load -i /tmp/advanced-console/out/api.zip
ssh -i $DEPLOY_ID_KEY_LOCATION chris@status.chrisb.info docker load -i /tmp/advanced-console/out/client.zip
ssh -i $DEPLOY_ID_KEY_LOCATION chris@status.chrisb.info docker-compose -f docker/docker-compose.yml down
ssh -i $DEPLOY_ID_KEY_LOCATION chris@status.chrisb.info docker-compose -f docker/docker-compose.yml up -d