FROM node:alphine as multistage

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install
RUN npm install react-scripts@3.0.1 -g

ADD src /usr/src/app/src
ADD public /usr/src/app/public

EXPOSE 3000

CMD [ "npm", "start" ]