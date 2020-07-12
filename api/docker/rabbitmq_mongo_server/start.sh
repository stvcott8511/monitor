#!/bin/bash

set -o allexport
source settings.env
set +o allexport

/etc/init.d/mongodb start
rabbitmq-server &> rabbitmq-server.log &

node index.js