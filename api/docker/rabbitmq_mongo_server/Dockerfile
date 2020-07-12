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
    
RUN apt install -y mongodb

RUN apt -y install erlang

RUN apt -y install rabbitmq-server

WORKDIR /root

COPY index.js .
COPY settings.env .
COPY start.sh .

ENV PATH=$PATH:/opt/node/bin

RUN chmod 755 start.sh

EXPOSE 1985
EXPOSE 5672

CMD sh -c ./start.sh