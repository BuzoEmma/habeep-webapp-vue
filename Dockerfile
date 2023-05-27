FROM node:lts-alpine AS build

WORKDIR /habeep/habeep-webapp

COPY package*.json ./

RUN npm install

RUN npm install -g http-server

COPY . ./

# RUN cp -r dist/* /var/www/habeep-webapp
   
EXPOSE 80

CMD [ "http-server", "dist"]
