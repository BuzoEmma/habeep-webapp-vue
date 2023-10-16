FROM node:lts-alpine

WORKDIR /habeep/habeep-webapp

COPY ./dist ./

RUN ls -la

EXPOSE 8080