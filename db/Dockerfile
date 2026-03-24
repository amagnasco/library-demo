# syntax=docker/dockerfile:1
# parse on semver 1.x.x

# most current version as of 2026-03-23
# debian bookworm
FROM postgres:18.3-bookworm AS base

    RUN localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
    ENV LANG en_US.utf8

    RUN apt-get update && apt-get install -y micro #postgresql-client

    #USER $POSTGRES_USER

# set up db
FROM base AS demo
    COPY *.sql /docker-entrypoint-initdb.d/
