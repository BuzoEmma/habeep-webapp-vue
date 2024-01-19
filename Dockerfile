FROM node:lts-alpine

WORKDIR /habeep/habeep-webapp

COPY ./dist ./

COPY ./sitemap.xml ./
COPY ./robots.txt ./
COPY ./_headers ./


RUN ls -la

EXPOSE 8080
