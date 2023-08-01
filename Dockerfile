FROM node:lts as node

WORKDIR /app

RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm ci


COPY . .
RUN ng build

# Stage 2
FROM nginx:stable

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/sygotchi .

EXPOSE 80
