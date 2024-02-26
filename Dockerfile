# Use an official Node.js image as the base image
FROM node:18-alpine as system


FROM system AS devenv

WORKDIR /app

CMD ["npm", "install"]
CMD ["npm","run","dev"]

#FROM nginx:1.21
#
#COPY --from=builder /app/nginx/default.conf.template /etc/nginx/templates/default.conf.template
#COPY --from=builder /app/dist /usr/share/nginx/html
#
#CMD ["nginx", "-g", "daemon off;"]

FROM system

WORKDIR /app

ARG VITE_BACKEND_URL
ARG VITE_BACKEND_PORT

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_BACKEND_PORT=$VITE_BACKEND_PORT

COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]

#CMD ["npx", "serve", "-s", "/dist"]
