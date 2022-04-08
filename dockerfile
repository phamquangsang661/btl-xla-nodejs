FROM ubuntu:18.04

RUN apt-get update && apt-get install -y git \ 
curl \
nodejs \
npm \ 
cmake \
build-essential \
ENV NODE_VERSION 14.19.1
ENV NVM_DIR .
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm use $NODE_VERSION
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH
RUN git clone https://github.com/phamquangsang661/btl-xla-nodejs
WORKDIR /btl-xla-nodejs
RUN npm install
