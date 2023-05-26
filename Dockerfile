FROM node:16

RUN npm install -g http-server 

WORKDIR /usr/src/habeep-webapp

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -l 

RUN npm run build

# RUN cp -r dist/* /var/www/habeep-web

EXPOSE 8080
CMD [ "http-server", "dist"]