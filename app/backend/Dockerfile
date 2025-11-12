# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS base
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src

EXPOSE 4000
CMD ["node", "src/index.js"]
