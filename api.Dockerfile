FROM node:14 as base

# Create app directory
WORKDIR /service

COPY api/ .

# TODO sync with environment variables
EXPOSE 9999

RUN yarn

# TARGET: local-dev
FROM base AS local-dev

CMD [ "yarn", "dev" ]

FROM base as prod

CMD [ "yarn", "start" ]
