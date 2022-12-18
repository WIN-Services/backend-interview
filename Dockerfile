FROM node:14.20.1-alpine as build

WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY tests ./tests
COPY jest.config.js ./

RUN npm install
RUN npm run build
RUN ls -a

## this is stage two , where the app actually runs
FROM node:14.20.1-alpine as deploy
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
COPY --from=build /app/dist .
RUN ls -a
EXPOSE 3000
CMD ["node","src/server.js"]