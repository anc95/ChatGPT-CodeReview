FROM node:18-slim
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
RUN yarn cache clean
ENV NODE_ENV="production"
COPY . .
CMD [ "yarn", "start" ]
