FROM node:lts-alpine

WORKDIR /habeep/habeep-webapp

COPY package*.json ./

RUN npm install

RUN ls -la

COPY . ./


RUN npm run build

COPY /sitemap.xml /dist/.

RUN cd /dist
RUN cd ls -la

EXPOSE 8080
