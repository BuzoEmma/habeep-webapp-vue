FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /habeep/habeep-webapp

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

# RUN cp -r dist/* /var/www/habeep-webapp

EXPOSE 8080

CMD [ "http-server", "dist"]
