FROM node:lts-alpine AS build

WORKDIR /habeep/habeep-webapp

COPY package*.json ./

RUN npm install

# RUN npm install -g http-server
COPY . ./

# RUN cp -r dist/* /var/www/habeep-webapp
   
EXPOSE 80

WORKDIR /habeep//habeep-webapp

RUN cp -r dist/* /var/www/habeep/client

RUN nginx -s reload

# CMD [ "http-server", "dist"]
