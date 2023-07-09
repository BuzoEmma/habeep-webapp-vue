FROM node:lts-alpine

WORKDIR /habeep/habeep-webapp

# COPY package*.json ./

# # RUN npm install


COPY . ./

# RUN npm run build

RUN mkdir dist

# COPY dist ./dist/
RUN ls -rf

COPY ./sitemap.xml ./dist/
COPY ./robots.txt ./dist/

EXPOSE 8080
