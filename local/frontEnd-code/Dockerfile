# Use Node 18 LTS
FROM node:18

WORKDIR /app

# Set environment variable available at build time
ARG NEXT_PUBLIC_IP_URL
ENV NEXT_PUBLIC_IP_URL=${NEXT_PUBLIC_IP_URL}

COPY . .

WORKDIR /app/Nextjs

RUN npm install

RUN npm run build

EXPOSE 3000

WORKDIR /app/Nextjs/out
# Use a shell script to echo and start the app
CMD ["sh", "-c", "echo '🚀 Next.js app running at http://localhost:3000' && npx serve -s . -l tcp://0.0.0.0:3000"]