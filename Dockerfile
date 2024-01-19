FROM node:20.2.0-bullseye-slim

WORKDIR /code

COPY package*.json /code/
RUN yarn install

COPY . /code/

EXPOSE 3000

CMD ["yarn", "dev"]