FROM node:20-alpine

USER $APP_UID

WORKDIR /app/src

EXPOSE 80
EXPOSE 443

RUN apk add --no-cache yarn

COPY package.json ./

RUN yarn install --frozen-lockfile \
  && yarn cache clean

ENV PATH /app/src/node_modules/.bin:$PATH
RUN yarn global add @nestjs/cli

COPY . .

RUN yarn build

CMD [ "yarn", "start:prod" ]

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD curl --silent --fail http://localhost:80/health || exit 1
