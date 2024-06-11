FROM mcr.microsoft.com/playwright:v1.44.1-jammy

COPY package.json           /app/package.json
COPY yarn.lock              /app/yarn.lock
COPY .yarnrc.yml            /app/.yarnrc.yml
COPY .yarn/releases         /app/.yarn/releases
COPY packages/e2e           /app/packages/e2e

WORKDIR /app

RUN yarn install

ENV CI=1

CMD [ "yarn", "workspace", "@bibcnrs/e2e", "run", "test" ]