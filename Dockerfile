FROM node:lts-alpine

WORKDIR /habeep/habeep-webapp

COPY package*.json ./

RUN npm install

RUN ls -la

RUN npm run build

COPY ./dist ./

COPY ./sitemap.xml ./
COPY ./robots.txt ./
COPY ./_headers ./

EXPOSE 8080