#сборка war
FROM node:18.19.0 as builder

ARG VITE_API_URL
ARG VITE_FUSION_ADDRESS

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_FUSION_ADDRESS=$VITE_FUSION_ADDRESS

WORKDIR /usr/src/app

COPY . /usr/src/app/
COPY ./docker/nginx/nginx.conf /urs/src/nginx/nginx.conf

RUN npm ci

RUN npm run build

#сборка образа с ресурсами, получившимися на стадии builder
FROM nginx:1.25.2

COPY --from=builder /usr/src/app/dist /var/www/admin_site
COPY --from=builder /urs/src/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 201