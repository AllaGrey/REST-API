FROM node

WORKDIR /NODE_JS_REST_API

COPY . .

RUN npm install
RUN npm rebuild bcrypt --build-from-source

EXPOSE 3000

CMD [ "node", "server" ]

