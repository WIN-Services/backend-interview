# FROM node:16-alpine
FROM node:16.14
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build
ENV NODE_ENV develop
# ENV NODE_ENV production
CMD ["node","dist/src/main.js"]
