# Use Node 18 LTS
FROM node:18

WORKDIR /app

COPY . .

WORKDIR /app/Node

RUN npm install

EXPOSE 5178

# Start server
CMD ["node", "app.js"]
