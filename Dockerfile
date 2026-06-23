FROM node:22-bookworm-slim

WORKDIR /usr/src/app

COPY package.json ./
COPY schemas/ ./schemas/

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
