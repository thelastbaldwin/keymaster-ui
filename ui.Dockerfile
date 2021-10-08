FROM node:14

# Create app directory
WORKDIR /ui

ADD ui/public ./public/
ADD ui/src ./src/
COPY ui/package.json .
COPY ui/yarn.lock .

EXPOSE 5000

RUN yarn && yarn build && yarn global add serve
CMD yarn serve
