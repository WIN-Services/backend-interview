FROM node:16.17.0

WORKDIR /usr/src

COPY . .

COPY ./package*.json ./

RUN npm ci

RUN npm run build

# COPY /usr/src/dist ./dist

# ADD create_tables.sql /docker-entrypoint-initdb.d/

CMD [ "node", "dist/index.js" ]

