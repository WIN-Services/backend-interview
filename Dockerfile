FROM node:12.18.1 as base

WORKDIR /home/workspace

COPY ["package.json", "./"]

RUN npm install
RUN npm install -g mocha

COPY . .

# Seperate image for test for additional test configurations as required
# FROM base as test
# CMD [ "npm ", "run", "test" ]

# # Seperate image for test for additional test
# FROM base as prod
CMD [ "npm", "run", "dev" ]