FROM node:16-alpine

ENV NODE_ENV production

WORKDIR /app

COPY apps/strapi/package.json ./

RUN yarn install

COPY apps/strapi/config ./config
COPY apps/strapi/database ./database
COPY apps/strapi/public ./public
COPY apps/strapi/src ./src
COPY apps/strapi/.env ./.env
COPY apps/strapi/tsconfig.json ./tsconfig.json

COPY apps/strapi/favicon.png ./favicon.png

RUN yarn build
CMD ["yarn", "start"]
