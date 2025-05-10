FROM node:slim

EXPOSE 3000

RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]