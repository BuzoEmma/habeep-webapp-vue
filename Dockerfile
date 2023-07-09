FROM node:lts-alpine

WORKDIR /habeep/habeep-webapp

COPY dist ./

# COPY package*.json ./

# RUN npm install

# RUN ls -la

# COPY . ./


# RUN npm run build

# COPY ./sitemap.xml ./dist/
# COPY ./robots.txt ./dist/

EXPOSE 8080
