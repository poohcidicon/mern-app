FROM node:20.11.1-alpine as builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build-prod


FROM nginx:1.13.12-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/.env /usr/share/nginx/html

EXPOSE 80

WORKDIR /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]