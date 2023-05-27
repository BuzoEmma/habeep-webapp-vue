FROM node:lts-alpine AS build

WORKDIR /habeep/habeep-webapp

COPY package*.json ./

RUN npm install

COPY . ./

   
RUN npm run build

WORKDIR /habeep/habeep-webapp/dist

RUN ls -la
COPY .  /var/www/habeep/client

EXPOSE 80
