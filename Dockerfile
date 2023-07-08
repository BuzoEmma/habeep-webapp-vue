FROM node:lts-alpine

WORKDIR /habeep/habeep-webapp

COPY package*.json ./
COPY .env ./
COPY .env.production ./

RUN npm install

RUN ls -la

COPY . ./

RUN npm run build

COPY ./sitemap.xml ./dist/
COPY ./robots.txt ./dist/

EXPOSE 8080
