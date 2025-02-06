FROM node:lts-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
COPY . .

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/package.json .
RUN npm install

COPY --from=builder /app/ .
RUN npm run build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/next.config.ts .
COPY --from=installer /app/package.json .
COPY --from=installer /app/.env.production .
COPY --from=installer --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=installer --chown=nextjs:nodejs /app/public ./public

EXPOSE 3000

CMD node server.js 