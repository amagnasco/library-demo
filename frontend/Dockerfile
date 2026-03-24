# syntax=docker/dockerfile:1
# semver 1.x.x

# most current version as of 2026-03-23
FROM node:25.8.1-alpine3.22 AS os
    RUN apk update && apk add --no-cache curl wget micro
    USER node

##### node
FROM os AS build
    WORKDIR /app
    COPY --chown=node:node *.json .
    RUN npm install

##### demo (vite compiles the typescript)
FROM os AS demo
    WORKDIR /app
    COPY --chown=node:node *.json .
    COPY --from=build --chown=node:node /app/node_modules ./node_modules
    COPY --chown=node:node vite.config.ts ./
    COPY --chown=node:node ./src ./src
    CMD [ "npm", "run", "dev" ]
