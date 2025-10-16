# Stage 1 — build
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (use a small cache layer)
COPY package.json package-lock.json* ./
RUN npm ci --production=false

# Copy source and build
COPY . .
RUN npm run build

# Stage 2 — production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# If you use a custom port, set it here (default Next.js uses 3000)
ENV PORT=3000

# Copy only what's needed from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules


EXPOSE 3000

# Use 'next start' to serve the built app
CMD ["npm", "run", "start"]
