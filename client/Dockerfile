FROM node:20.11.1-alpine as builder
WORKDIR /app
COPY . .

# RUN chmod +x env.sh
# RUN ./env.sh
RUN npm install
RUN npm run build-prod

FROM nginx:stable-alpine AS runtime

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
# COPY env.sh .

# Make our shell script executable
# RUN chmod +x env.sh

# Start Nginx server
# CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
CMD ["nginx", "-g", "daemon off;"]