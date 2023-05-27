FROM node:lts-alpine

WORKDIR /habeep/habeep-webapp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY  /habeep/habeep-webapp/dist /var/www/habeep/client

EXPOSE 80
