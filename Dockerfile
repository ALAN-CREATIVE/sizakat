FROM node:10-alpine as dev
WORKDIR /app/frontend
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn
COPY . .

FROM node:10-alpine as prod
WORKDIR /app/frontend
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install --prod
COPY . .
RUN yarn build
