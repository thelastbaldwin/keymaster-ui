FROM node:14

# Create app directory
WORKDIR /

ADD api/keymaster ./keymaster/
ADD api//util ./util/
COPY api/api.js .
COPY api/package.json .
COPY api/yarn.lock .
COPY api/.env .

# TODO sync with environment variables
EXPOSE 9999

RUN yarn
CMD yarn start
