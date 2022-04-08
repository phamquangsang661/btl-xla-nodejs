FROM ubuntu:18.04
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get update && apt-get install -y git curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install -y cmake \ 
build-essential 
RUN apt-get install -y nodejs 
RUN git clone https://github.com/phamquangsang661/btl-xla-nodejs
WORKDIR /btl-xla-nodejs
RUN npm install
RUN npm install -g nodemon
RUN npm install -g ts-node