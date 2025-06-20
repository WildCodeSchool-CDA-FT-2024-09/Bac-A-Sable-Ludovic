FROM node:lts-alpine as dev

WORKDIR /app

# ✅ Ajout des outils nécessaires à node-gyp + symlink python
RUN apk add --no-cache python3 make g++ \
  && ln -sf python3 /usr/bin/python

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
