FROM node:lts-alpine

WORKDIR /habeep/habeep-webapp

COPY package*.json ./

RUN npm install

RUN ls -la

COPY . ./

COPY /sitemap.xml /dist/.

RUN npm run build

EXPOSE 8080
