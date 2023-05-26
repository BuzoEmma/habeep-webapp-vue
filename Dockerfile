FROM node:lts-alpine as build-stage

WORKDIR /habeep/habeep-webapp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY --from=build-stage /habeep/habeep-webapp/dist /var/www/habeep-web