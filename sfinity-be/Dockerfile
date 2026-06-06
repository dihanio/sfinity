FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# Biasanya port untuk Express.js
EXPOSE 5000

CMD ["npm", "start"]
