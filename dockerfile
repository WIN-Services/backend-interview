FROM node:18.14.2

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY ["package.json", "./"]

RUN npm install

COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

CMD [ "node", "server.js" ]