FROM node:12.18.1

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

# Run tests
RUN npm test

# Start the application
CMD ["node", "server.js"]
