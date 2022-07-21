FROM node:lts-alpine

WORKDIR /app

COPY package*.json .

RUN npm prune --production

COPY . .

RUN npm install

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]