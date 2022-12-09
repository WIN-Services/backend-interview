FROM node:16.16.0

WORKDIR /

COPY ["package.json", "./"]

RUN npm ci

COPY . .

CMD [ "node", "server.js" ]