FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY wait-for /wait-for
RUN chmod +x /wait-for
EXPOSE 5000
CMD [ "npm", "start" ]
