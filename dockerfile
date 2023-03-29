FROM node:12.18.1
WORKDIR /app
ENV APP_NAME=OrderManagement
ENV PORT=3000
ENV CONNECTIONSTRING=mongodb://localhost:27017/orderManagement
COPY ["package.json", "./"]

RUN npm install

COPY . .

CMD [ "node", "server.js" ]