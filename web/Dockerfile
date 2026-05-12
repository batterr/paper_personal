FROM node:22-alpine AS deps

WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci --no-audit --fund=false

FROM node:22-alpine AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npm prune --omit=dev

FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=80
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 80
CMD ["sh", "-c", "npm start -- -p ${PORT:-80} -H 0.0.0.0"]
