FROM node:lts-alpine as dev

WORKDIR /app

COPY *.json ./

RUN npm install

COPY src src

COPY data data

# RUN npm run seed

COPY ./jest.config.ts .

COPY tests tests    

EXPOSE 4000

CMD ["npm", "run", "full"]



