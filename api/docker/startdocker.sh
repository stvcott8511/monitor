#!/bin/bash

if [ "$1" == "rabbitmq_mongo_server" ]; then
    if [ "$2" != "" ]; then
        rm -rf dockerbuild
        mkdir dockerbuild
        npm i
        if [ "$3" == "dev" ]
        then
            echo "Starting webpack dev build"
            npm run build:dev
        else
            npm run build
        fi
        cp rabbitmq_mongo_server/Dockerfile dockerbuild/Dockerfile
        cp ../config/settings.env dockerbuild/
        cp ../build/index.js dockerbuild/
        cp ../build/index.js.map dockerbuild/
        cp rabbitmq_mongo_server/start.sh dockerbuild/
        cd dockerbuild
        docker build -t $2 .
    else
        echo "Most provide docker image name"
        exit 0
    fi
else
    echo "Most provide build type of [combined]"
    exit 0
fi