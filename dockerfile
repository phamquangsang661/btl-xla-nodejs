FROM ubuntu:18.04
RUN apt-get update && apt-get install -y git curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
RUN export NVM_DIR="$HOME/.nvm" \
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  \
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 
RUN nvm install 14.19.1
RUN nvm use 14.19.1
RUN git clone https://github.com/phamquangsang661/btl-xla-nodejs
WORKDIR /btl-xla-nodejs
RUN npm install
