# Use an official Node.js image as the base image
FROM node:18-alpine as system

FROM system AS builder

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

FROM system AS devenv

WORKDIR /app

CMD ["npm", "install"]
CMD ["npm","run","dev"]

FROM nginx:1.21

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
