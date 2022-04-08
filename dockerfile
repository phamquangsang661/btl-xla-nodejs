FROM ubuntu:18.04
RUN apt-get update && apt-get install -y git curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install 14.19.1 \
    && nvm use 14.19.1
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH
RUN git clone https://github.com/phamquangsang661/btl-xla-nodejs
WORKDIR /btl-xla-nodejs
RUN npm install
