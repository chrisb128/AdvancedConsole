#!/bin/sh

echo Authorization key located at $DEPLOY_ID_KEY_LOCATION

echo Sending files to server
scp -Cr -i $DEPLOY_ID_KEY_LOCATION ./out/ chris@status.chrisb.info:/tmp/advanced-console/

echo Loading images
ssh -i $DEPLOY_ID_KEY_LOCATION chris@status.chrisb.info docker load -i /tmp/advanced-console/out/storage.zip
ssh -i $DEPLOY_ID_KEY_LOCATION chris@status.chrisb.info docker load -i /tmp/advanced-console/out/api.zip
ssh -i $DEPLOY_ID_KEY_LOCATION chris@status.chrisb.info docker load -i /tmp/advanced-console/out/client.zip

echo Taking down
ssh -i $DEPLOY_ID_KEY_LOCATION chris@status.chrisb.info docker-compose -f docker/docker-compose.yml down

echo Bringing back up
ssh -i $DEPLOY_ID_KEY_LOCATION chris@status.chrisb.info docker-compose -f docker/docker-compose.yml up -d