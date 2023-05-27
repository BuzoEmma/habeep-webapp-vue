FROM node:lts-alpine

WORKDIR /habeep/habeep-webapp

COPY package*.json ./

RUN npm install

COPY . ./

# RUN cp -r dist/* /var/www/habeep-webapp

EXPOSE 8080

CMD [ "npm", "run", "dev"]
