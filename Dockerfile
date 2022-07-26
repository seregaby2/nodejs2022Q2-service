FROM node:lts-alpine As dev
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
EXPOSE ${PORT}
CMD [ "npm", "run", "start:dev"]