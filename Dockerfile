FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

# Dev: semua dependency ikut terpasang supaya nodemon tersedia.
FROM base AS dev
RUN npm ci
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]

# Prod: hanya dependency runtime, jalan sebagai user non-root.
FROM base AS prod
RUN npm ci --omit=dev && npm cache clean --force
COPY . .
USER node
EXPOSE 5000
CMD ["node", "server.js"]
