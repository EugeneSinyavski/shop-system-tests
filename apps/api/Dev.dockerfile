FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/api/package.json ./apps/api/
COPY packages/dto/package.json ./packages/dto/

COPY apps/api/prisma ./apps/api/prisma

RUN pnpm install --frozen-lockfile --prod=false

EXPOSE 3000

CMD ["pnpm", "--filter", "api", "run", "start:dev"]