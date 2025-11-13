FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY packages/dto/package.json ./packages/dto/

RUN pnpm install --frozen-lockfile --prod=false
EXPOSE 5173
CMD ["pnpm", "--filter", "web", "run", "dev"]