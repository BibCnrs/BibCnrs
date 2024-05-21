FROM node:14.21.2-bullseye-slim

ADD ./.babelrc              /app/.babelrc
ADD ./bin                   /app/bin
ADD ./config                /app/config
ADD ./lib                   /app/lib
ADD ./server.js             /app/server.js
ADD ./launcher.js           /app/launcher.js
ADD ./package.json          /app/package.json
ADD ./package-lock.json     /app/package-lock.json

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD npm run dev
