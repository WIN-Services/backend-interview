FROM node:current-alpine3.15 as build

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

FROM node:current-alpine3.15 as app

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./

COPY --from=build /usr/src/app/node_modules/ ./node_modules/

COPY --from=build /usr/src/app/dist/ ./dist/

RUN apk add --no-cache curl

EXPOSE 3000

CMD node dist/main