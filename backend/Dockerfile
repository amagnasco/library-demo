# syntax=docker/dockerfile:1
# semver 1.x.x

# most current version as of 2026-03-23
FROM node:25.8.1-alpine3.22 AS os
    RUN apk update && apk add --no-cache postgresql openssl micro
    USER node

##### node
FROM os AS build
    WORKDIR /code
    COPY --chown=node:node *.json .
    RUN npm install --only-production

##### typescript
FROM build AS tsc
    WORKDIR /code
    COPY --from=build . .
    COPY --chown=node:node ./src ./src
    RUN npm install
    RUN npm run build

##### demo
FROM os AS demo
    WORKDIR /code
    COPY --chown=node:node *.json .
    COPY --from=build --chown=node:node /code/node_modules ./node_modules
    COPY --from=tsc --chown=node:node /code/dist ./dist
    CMD [ "npm", "run", "exec" ]
