FROM node:latest

WORKDIR /usr/app

COPY ./ /usr/app

COPY ["package.json", "./"]

RUN npm install

CMD [ "npm", "start" ]

