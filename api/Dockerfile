FROM node:lts-alpine as dev

WORKDIR /app

# ✅ Installe les dépendances nécessaires à node-gyp et sqlite3
RUN apk add --no-cache \
  python3 \
  py3-setuptools \
  make \
  g++ \
  && ln -sf python3 /usr/bin/python

COPY *.json ./

RUN npm install

COPY src src
COPY data data
COPY ./jest.config.ts .
COPY tests tests

EXPOSE 4000

CMD ["npm", "run", "full"]
