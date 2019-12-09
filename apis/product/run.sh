#!/bin/bash

# read env
while IFS='=' read -r name value
do
    if [ "$name" == "MONGOPORT" ]; then
        MONGOPORT=$value
    fi
    if [ "$name" == "MONGOVOLUME" ]; then
        MONGOVOLUME=$value
    fi
done < .env

# docker setting
DOCKERINSTALL=$(which docker)
if [ "docker" != "$DOCKERINSTALL" ]; then
    apt update -y
    apt install -y docker.io
fi

# mongo db start
MONGODBRUN=$(docker container ls | grep -w -o mongodb)
if [ "mongodb" != "$MONGODBRUN" ]; then
    docker run --name mongodb -p ${MONGOPORT} -v ${VOLUME} -d mongo
fi

# server setting
PM2INSTALL=$(npm ls -g --depth=0 | grep -w -o pm2)
if [ "pm2" != "$PM2INSTALL" ]; then
    npm install -g pm2
    pm2 start ./build/bin/www --name server
fi
