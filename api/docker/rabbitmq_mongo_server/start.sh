#!/bin/bash

set -o allexport
source settings.env
set +o allexport

mongod --config /etc/mongod.conf &> mongod.log &
rabbitmq-server &> rabbitmq-server.log &

node index.js