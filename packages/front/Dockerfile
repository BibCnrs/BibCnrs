FROM node:22-alpine AS base

RUN apk update && apk upgrade
RUN mkdir -p /app/.yarn
RUN mkdir -p /app/packages/front

# Copy all files used by yarn
COPY package.json                       /app/package.json
COPY yarn.lock                          /app/yarn.lock
COPY .yarnrc.yml                        /app/.yarnrc.yml
COPY .yarn/releases                     /app/.yarn/releases
COPY packages/front/package.json    /app/packages/front/package.json

WORKDIR /app

FROM base AS sources

ENV NODE_ENV=production

COPY --chown=node:node  tsconfig.json           ./tsconfig.json
COPY --chown=node:node  packages/front/     ./packages/front/

RUN yarn workspaces focus @bibcnrs/front

FROM sources AS dev

ENV NODE_ENV=development

CMD ["yarn", "workspace", "@bibcnrs/front", "run", "dev"]

FROM sources AS prod-builder

ARG BIBAPI_HOST
ARG MATOMO_TRACKER_URL
ARG MATOMO_SCRIPT_URL
ARG MATOMO_SITE_ID
ARG SOURCE_MAP=false

ENV VITE_BIBAPI_HOST=$BIBAPI_HOST \
    VITE_ENV="prod" \
    VITE_SOURCE_MAP=$SOURCE_MAP \
    VITE_MATOMO_TRACKER_URL=$MATOMO_TRACKER_URL \
    VITE_MATOMO_SCRIPT_URL=$MATOMO_SCRIPT_URL \
    VITE_MATOMO_SITE_ID=$MATOMO_SITE_ID

RUN yarn workspace @bibcnrs/front run build

FROM nginx:1.25-alpine

RUN rm -rf /usr/share/nginx/html/*
ADD ./packages/front/nginx.conf             /etc/nginx/conf.d/default.conf
COPY --from=prod-builder     /app/packages/front/dist  /usr/share/nginx/html

EXPOSE 80
