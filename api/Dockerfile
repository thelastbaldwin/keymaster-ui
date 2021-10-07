FROM node:14

# Create app directory
WORKDIR /

ADD /keymaster ./keymaster/
ADD /util ./util/
COPY api.js .
COPY package.json .
COPY yarn.lock .

EXPOSE 9000

RUN yarn
CMD yarn start
