FROM node:lts-alpine AS build

WORKDIR /habeep/habeep-webapp

COPY package*.json ./

RUN npm install

# RUN npm install -g http-server
COPY . ./

# RUN cp -r dist/* /var/www/habeep-webapp
   
RUN npm run build

WORKDIR /habeep/habeep-webapp

RUN ls -la

RUN cp -r dist/* /var/www/habeep/client


EXPOSE 80
RUN nginx -s reload

# CMD [ "http-server", "dist"]
