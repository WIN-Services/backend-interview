FROM node:16.14.1

WORKDIR /project-name

COPY ["package.json", "./"]

RUN npm install

COPY . .

CMD [ "npm", "start" ]