FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]

# This Dockerfile sets up a Node.js environment for the backend of a web application.