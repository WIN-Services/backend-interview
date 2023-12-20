FROM node:slim

RUN mkdir -p /app

WORKDIR /app

RUN ls -al

COPY ["package.json", "./"]

COPY ./prisma .

COPY ./.env .

RUN npm install

# RUN npx prisma migrate deploy

RUN npx prisma generate

COPY . .

CMD [ "node", "server.js" ]
