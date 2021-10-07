FROM node:14

# Create app directory
WORKDIR /ui

ADD /public ./public/
ADD /src ./src/
COPY package.json .
COPY yarn.lock .

EXPOSE 5000

RUN yarn && yarn build && yarn global add serve
CMD yarn serve
