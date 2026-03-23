# syntax=docker/dockerfile:1
# semver 1.x.x

FROM nginx:latest AS base
    RUN apt-get update && apt-get install -y curl micro

FROM base AS demo
    COPY nginx.conf /etc/nginx/nginx.conf
    CMD ["nginx", "-g", "daemon off;"]
