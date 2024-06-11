FROM node:22-alpine as base

RUN apk update && apk upgrade
RUN mkdir -p /app/.yarn
RUN mkdir -p /app/packages/bib-front

# Copy all files used by yarn
COPY package.json                       /app/package.json
COPY yarn.lock                          /app/yarn.lock
COPY .yarnrc.yml                        /app/.yarnrc.yml
COPY .yarn/releases                     /app/.yarn/releases
COPY packages/bib-front/package.json    /app/packages/bib-front/package.json

WORKDIR /app

FROM base as sources

ENV NODE_ENV=production

COPY --chown=node:node  tsconfig.json           ./tsconfig.json
COPY --chown=node:node  packages/bib-front/     ./packages/bib-front/

RUN yarn workspaces focus @bibcnrs/bib-front

FROM sources as dev

ENV NODE_ENV=development

CMD ["yarn", "workspace", "@bibcnrs/bib-front", "run", "dev"]

FROM sources as prod-builder

ARG BIBAPI_HOST
ARG SOURCE_MAP=false

ENV VITE_BIBAPI_HOST=$BIBAPI_HOST \
    VITE_ENV="prod" \
    VITE_SOURCE_MAP=$SOURCE_MAP

RUN yarn workspace @bibcnrs/bib-front run build

FROM nginx:1.25-alpine

RUN rm -rf /usr/share/nginx/html/*
ADD ./packages/bib-front/nginx.conf             /etc/nginx/conf.d/default.conf
COPY --from=prod-builder     /app/packages/bib-front/dist  /usr/share/nginx/html

EXPOSE 80
