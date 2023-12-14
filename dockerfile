FROM node:12.18.1

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install
FROM node:14.17 as build
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build



FROM node:14.17-alpine
WORKDIR /app
COPY --from=build /app/.yarnrc .
COPY --from=build /app/package.json .
COPY --from=build /app/yarn.lock .
COPY --from=build /app/dist ./dist
COPY --from=build /app/configs ./configs
COPY --from=build /app/migrations ./migrations
COPY --from=build /app/knexfile.ts .



RUN apk add --no-cache --virtual .gyp python3 make g++ \
&& yarn install --production \
&& apk del .gyp



EXPOSE 8000
CMD [ "yarn", "start" ]
COPY . .

CMD [ "node", "server.js" ]
