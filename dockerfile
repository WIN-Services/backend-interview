FROM node:16.14
WORKDIR /app
COPY ./package.json ./
RUN npm install -legacy-peer-deps
COPY ./ ./
EXPOSE 3002
CMD ["npm","run","start"]
