FROM node:lts-alpine

WORKDIR /habeep/habeep-webapp

COPY package*.json ./

RUN npm install

RUN ls -la

COPY . ./


RUN npm run build

COPY ./sitemap.xml ./dist/
COPY /.env.production ./dist/

EXPOSE 8080
