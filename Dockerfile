FROM node:20-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

# Use your npm start
CMD ["npm","start"]
