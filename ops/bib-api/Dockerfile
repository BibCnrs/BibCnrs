FROM node:22-alpine as base

RUN apk update && apk upgrade && apk add --no-cache curl
RUN mkdir -p /app/.yarn
RUN mkdir -p /app/packages/bib-api
RUN mkdir -p /app/packages/bib-api/uploads && chown node:node /app/packages/bib-api/uploads

# Copy all files used by yarn
COPY package.json                       /app/package.json
COPY yarn.lock                          /app/yarn.lock
COPY .yarnrc.yml                        /app/.yarnrc.yml
COPY .yarn/releases                     /app/.yarn/releases
COPY packages/bib-api/package.json      /app/packages/bib-api/package.json

WORKDIR /app

# Stage 1 - Build the application
FROM base as sources

ENV NODE_ENV=production

COPY --chown=node:node  tsconfig.json           ./tsconfig.json
COPY --chown=node:node  packages/bib-api/       ./packages/bib-api/

RUN yarn workspaces focus @bibcnrs/bib-api
RUN yarn workspace @bibcnrs/bib-api prisma generate


RUN mkdir -p /app/packages/bib-api/dist/ezticket && chown node:node /app/packages/bib-api/dist/ezticket
RUN cp /app/packages/bib-api/src/ezticket/bibcnrs.png /app/packages/bib-api/dist/ezticket/bibcnrs.png


FROM sources as dev

ENV NODE_ENV=development

CMD ["yarn", "workspace", "@bibcnrs/bib-api", "run", "start:dev"]

FROM sources as e2e

ENV NODE_ENV=production

CMD ["yarn", "workspace", "@bibcnrs/bib-api", "run", "start:e2e"]

# Build production app
FROM sources as prod-builder

ENV NODE_ENV=production

RUN yarn workspace @bibcnrs/bib-api run build

# Production dependencies
FROM base as prod-deps

ENV NODE_ENV=production

RUN yarn workspaces focus --production @bibcnrs/bib-api

# Stage 3 - the production environment
FROM base

ENV NODE_ENV=production

COPY --from=prod-builder    /app/package.json                   /app/package.json
COPY --from=prod-builder    /app/packages/bib-api/package.json  /app/packages/bib-api/package.json
COPY --from=prod-builder    /app/packages/bib-api/dist          /app/packages/bib-api/dist
COPY --from=sources         /app/packages/bib-api/prisma        /app/packages/bib-api/prisma  
COPY --from=prod-deps       /app/node_modules                   /app/node_modules
COPY --from=sources         /app/node_modules/.prisma           /app/node_modules/.prisma
COPY --from=sources         /app/node_modules/@prisma           /app/node_modules/@prisma

EXPOSE 3000

CMD ["yarn", "workspace", "@bibcnrs/bib-api", "run", "start:prod"]
