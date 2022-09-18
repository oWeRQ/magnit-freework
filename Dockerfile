FROM node:14-alpine
RUN apk add yarn
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
EXPOSE 8081
CMD yarn run serve --port 8081
