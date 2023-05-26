FROM node:lts-alpine

WORKDIR /habeep/habeep-webapp

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

# RUN cp -r dist/* /var/www/habeep-webapp

EXPOSE 80

