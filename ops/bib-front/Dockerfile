FROM node:22-alpine as base

RUN apk upgrade
RUN mkdir -p /app/packages/bib-front

# Copy all files used by yarn
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/bib-front/package.json ./packages/bib-front/package.json

RUN yes | corepack enable && yarn -v

FROM base as sources

ENV NODE_ENV=production

COPY tsconfig.json ./
COPY packages/bib-front/ ./packages/bib-front/
RUN yarn workspaces focus @bibcnrs/bib-front

FROM sources as dev

ENV NODE_ENV=development

CMD ["yarn", "workspace", "@bibcnrs/bib-front", "run", "dev"]

FROM sources as prod-builder

ARG BIBAPI_HOST
ARG SOURCE_MAP

ENV VITE_BIBAPI_HOST=$BIBAPI_HOST \
    VITE_ENV="prod" \
    VITE_SOURCE_MAP=$SOURCE_MAP

RUN yarn workspace @bibcnrs/bib-api run build

FROM nginx:1.25-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
