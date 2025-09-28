# Use Node 18 LTS
FROM node:18

WORKDIR /app

COPY . .

WORKDIR /app/Nextjs

RUN npm install

EXPOSE 3000
# Use a shell script to echo and start the app
CMD ["sh", "-c", "echo '🚀 Next.js app running at http://localhost:3000' && npm run dev"]