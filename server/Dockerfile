FROM node:latest

RUN apt-get update && apt-get install -y wget \
    && wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-linux-amd64-v0.6.1.tar.gz

RUN mkdir -p /home/node/app/node_modules && chown -R root:root /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER root
RUN npm install
COPY --chown=root:root . .
EXPOSE 3000
CMD ["dockerize", "-wait", "tcp://db:3306", "-timeout", "30s", "npm", "start"]