FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

ADD src /usr/src/app/src
ADD public /usr/src/app/public

EXPOSE 3000

CMD [ "npm", "start" ]