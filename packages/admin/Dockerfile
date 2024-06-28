FROM node:22-alpine AS base

RUN apk update && apk upgrade
RUN mkdir -p /app/.yarn
RUN mkdir -p /app/packages/admin

# Copy all files used by yarn
COPY package.json                       /app/package.json
COPY yarn.lock                          /app/yarn.lock
COPY .yarnrc.yml                        /app/.yarnrc.yml
COPY .yarn/releases                     /app/.yarn/releases
COPY packages/admin/package.json        /app/packages/admin/package.json

WORKDIR /app

FROM base AS sources

ENV NODE_ENV=production

COPY --chown=node:node  tsconfig.json           ./tsconfig.json
COPY --chown=node:node  packages/admin/         ./packages/admin/

RUN yarn workspaces focus @bibcnrs/admin

FROM sources AS dev

ENV NODE_ENV=development

CMD ["yarn", "workspace", "@bibcnrs/admin", "run", "dev"]

FROM sources AS prod-builder

ARG BIBAPI_HOST
ARG SOURCE_MAP=false

ENV VITE_BIBAPI_HOST=$BIBAPI_HOST \
    VITE_ENV="prod" \
    VITE_SOURCE_MAP=$SOURCE_MAP

RUN yarn workspace @bibcnrs/admin run build

FROM nginx:1.25-alpine

RUN rm -rf /usr/share/nginx/html/*
ADD ./packages/admin/nginx.conf                 /etc/nginx/conf.d/default.conf
COPY --from=prod-builder    /app/packages/admin/dist    /usr/share/nginx/html

EXPOSE 80
