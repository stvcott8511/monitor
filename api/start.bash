#!/bin/bash

set -o allexport
source config/settings.env
set +o allexport
node build/index.js