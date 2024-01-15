FROM node:lts-alpine

WORKDIR /habeep/habeep-webapp

COPY package*.json ./files

RUN npm install

RUN ls -la

COPY . ./files

RUN npm run build

COPY /habeep/habeep-webapp/files/dist ./

RUN rm -rf /habeep/habeep-webapp/files

COPY ./sitemap.xml ./
COPY ./robots.txt ./
COPY ./_headers ./


RUN ls -la

EXPOSE 8080