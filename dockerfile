FROM node:20-alpine

ENV NODE_ENV=dev

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 4000

USER node

CMD ["npm", "start"]