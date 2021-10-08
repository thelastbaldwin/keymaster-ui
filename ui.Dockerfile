FROM node:14 as base

# Create app directory
WORKDIR /

COPY ./ui/ .

# MUST MATCH ENV VAR
EXPOSE 5000

# TARGET: local-dev
FROM base AS local-dev

RUN yarn

CMD [ "yarn", "start" ]


FROM base as prod

RUN set -a; source .env; set -a
RUN yarn && yarn build && yarn global add serve

CMD [ "yarn", "serve" ]
