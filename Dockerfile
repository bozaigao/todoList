FROM node
WORKDIR /app
COPY package*.json /app/
RUN yarn
COPY . /app
RUN yarn build

FROM nginx
COPY --from=0 /app/build /usr/share/nginx/html
COPY --from=0 /app/nginx.conf /etc/nginx/conf.d/default.conf
