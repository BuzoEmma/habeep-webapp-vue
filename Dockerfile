FROM node:lts-alpine as build-stage

WORKDIR /habeep/habeep-webapp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY --from=build-stage /usr/src/habeep-webapp/dist /var/www/habeep-web