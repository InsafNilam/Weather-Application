FROM node:17 - alphine

WORKDIR /app

COPY package.json ./
COPY package.lock.json ./

RUN npm install --silent
COPY . ./
EXPOSE 3000

CMD ["npm", "start"]


