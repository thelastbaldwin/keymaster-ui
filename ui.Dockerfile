FROM node:14

# Create app directory
WORKDIR /ui

ADD ui/public ./public/
ADD ui/src ./src/
COPY ui/package.json .
COPY ui/yarn.lock .
COPY ui/.env .

# TODO sync with environment variables
EXPOSE 5000

RUN set -a; source .env; set -a
RUN yarn && yarn build && yarn global add serve
CMD yarn serve
