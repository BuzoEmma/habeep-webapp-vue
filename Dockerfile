FROM node:lts-alpine

WORKDIR /habeep/habeep-webapp

COPY package*.json ./

COPY . ./

RUN ls -la

EXPOSE 8081