FROM node:22-alpine as base

RUN apk upgrade
RUN mkdir -p /app/packages/bib-api

# Copy all files used by yarn
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/bib-api/package.json ./packages/bib-api/package.json

RUN yes | corepack enable && yarn -v

# Stage 1 - Build the application
FROM base as sources

ENV NODE_ENV=production

COPY tsconfig.json ./
COPY packages/bib-api/ ./packages/bib-api/

RUN yarn workspaces focus @bibcnrs/bib-api

FROM sources as dev

ENV NODE_ENV=development

CMD ["yarn", "workspace", "@bibcnrs/bib-api", "run", "start:dev"]

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
COPY --from=prod-deps       /app/node_modules                   /app/node_modules

# RUN yarn prisma generate

EXPOSE 3000

CMD ["yarn", "workspace", "@bibcnrs/bib-api", "run", "start:prod"]
