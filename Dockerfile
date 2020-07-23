FROM node:10

WORKDIR /app/frontend

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn

COPY . .
RUN yarn build
