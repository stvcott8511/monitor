FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive 

RUN apt update && \
    apt-get dist-upgrade -y && \
    apt-get install -y wget  && \
    apt-get install -y xz-utils && \
    apt-get install -y gpg && \
    apt-get install -y gnupg && \
    apt-get install -y lsb-core

WORKDIR /opt

RUN wget https://nodejs.org/dist/v12.16.1/node-v12.16.1-linux-x64.tar.xz && \
    tar -xvf node-v12.16.1-linux-x64.tar.xz && \
    mv node-v12.16.1-linux-x64 node
    
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add - && \
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list && \
    apt update && \
    apt install -y mongodb-org

RUN wget -O- https://packages.erlang-solutions.com/ubuntu/erlang_solutions.asc | apt-key add - && \
    echo "deb https://packages.erlang-solutions.com/ubuntu bionic contrib" | tee /etc/apt/sources.list.d/rabbitmq.list && \
    apt update && \
    apt -y install erlang

RUN wget -O- https://dl.bintray.com/rabbitmq/Keys/rabbitmq-release-signing-key.asc | apt-key add - && \
    wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | apt-key add - && \
    echo "deb https://dl.bintray.com/rabbitmq/debian $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/rabbitmq.list && \
    apt update && \
    apt -y install rabbitmq-server

WORKDIR /root

COPY index.js .
COPY settings.env .
COPY start.sh .

ENV PATH=$PATH:/opt/node/bin

RUN chmod 755 start.sh

EXPOSE 1985
EXPOSE 5672

CMD sh -c ./start.sh