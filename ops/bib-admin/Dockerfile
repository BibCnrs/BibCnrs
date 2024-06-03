FROM node:22-alpine as base

RUN apk upgrade
RUN mkdir -p /app/.yarn
RUN mkdir -p /app/packages/bib-admin

# Copy all files used by yarn
COPY package.json                       /app/package.json
COPY yarn.lock                          /app/yarn.lock
COPY .yarnrc.yml                        /app/.yarnrc.yml
COPY .yarn/releases                     /app/.yarn/releases
COPY packages/bib-admin/package.json    /app/packages/bib-admin/package.json

WORKDIR /app

FROM base as sources

ENV NODE_ENV=production

COPY --chown=node:node  tsconfig.json           ./tsconfig.json
COPY --chown=node:node  packages/bib-admin/     ./packages/bib-admin/

RUN yarn workspaces focus @bibcnrs/bib-admin

FROM sources as dev

ENV NODE_ENV=development

CMD ["yarn", "workspace", "@bibcnrs/bib-admin", "run", "dev"]

FROM sources as prod-builder

ARG BIBAPI_HOST
ARG CONTENT_DELIVERY_HOST
ARG SOURCE_MAP=false

ENV VITE_BIBAPI_HOST=$BIBAPI_HOST \
    VITE_CONTENT_DELIVERY_HOST=$CONTENT_DELIVERY_HOST \  
    VITE_ENV="prod" \
    VITE_SOURCE_MAP=$SOURCE_MAP

RUN yarn workspace @bibcnrs/bib-admin run build

FROM nginx:1.25-alpine

RUN rm -rf /usr/share/nginx/html/*
ADD ./packages/bib-admin/nginx.conf             /etc/nginx/conf.d/default.conf
COPY --from=prod-builder    /app/packages/bib-admin/dist    /usr/share/nginx/html

EXPOSE 80
