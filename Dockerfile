# Use an official Node.js image as the base image
FROM node:18-alpine as system


FROM system AS devenv

WORKDIR /app

CMD ["npm","run","dev"]

FROM system as builder

WORKDIR /app

ARG VITE_BACKEND_URL
ARG VITE_BACKEND_PORT

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_BACKEND_PORT=$VITE_BACKEND_PORT

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

FROM nginx:1.21

COPY --from=builder /app/nginx.config /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
