FROM node:23.3-alpine3.21 AS base

RUN apk update && apk upgrade && apk add --no-cache curl && apk add openssl
RUN mkdir -p /app/.yarn
RUN mkdir -p /app/packages/api
RUN mkdir -p /app/packages/api/uploads && chown node:node /app/packages/api/uploads

# Copy all files used by yarn
COPY package.json                       /app/package.json
COPY yarn.lock                          /app/yarn.lock
COPY .yarnrc.yml                        /app/.yarnrc.yml
COPY .yarn/releases                     /app/.yarn/releases
COPY packages/api/package.json          /app/packages/api/package.json

WORKDIR /app

# Stage 1 - Build the application
FROM base AS sources

ENV NODE_ENV=production

COPY --chown=node:node  tsconfig.json           ./tsconfig.json
COPY --chown=node:node  packages/api/           ./packages/api/

RUN yarn workspaces focus @bibcnrs/api
RUN yarn workspace @bibcnrs/api prisma generate


RUN mkdir -p /app/packages/api/dist/ezticket && chown node:node /app/packages/api/dist/ezticket
RUN cp /app/packages/api/src/ezticket/bibcnrs.png /app/packages/api/dist/ezticket/bibcnrs.png


FROM sources AS dev

ENV NODE_ENV=development

CMD ["yarn", "workspace", "@bibcnrs/api", "run", "start:dev"]

FROM sources AS e2e

ENV NODE_ENV=production

CMD ["yarn", "workspace", "@bibcnrs/api", "run", "start:e2e"]

# Build production app
FROM sources AS prod-builder

ENV NODE_ENV=production

RUN yarn workspace @bibcnrs/api run build

# Production dependencies
FROM base AS prod-deps

ENV NODE_ENV=production

RUN yarn workspaces focus --production @bibcnrs/api

# Stage 3 - the production environment
FROM base

ENV NODE_ENV=production

COPY --from=prod-builder    /app/package.json                   /app/package.json
COPY --from=prod-builder    /app/packages/api/package.json      /app/packages/api/package.json
COPY --from=prod-builder    /app/packages/api/dist              /app/packages/api/dist
COPY --from=sources         /app/packages/api/prisma            /app/packages/api/prisma  
COPY --from=prod-deps       /app/node_modules                   /app/node_modules
COPY --from=sources         /app/node_modules/.prisma           /app/node_modules/.prisma
COPY --from=sources         /app/node_modules/@prisma           /app/node_modules/@prisma

EXPOSE 3000

CMD ["yarn", "workspace", "@bibcnrs/api", "run", "start:prod"]
