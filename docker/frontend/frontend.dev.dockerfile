# Base dev image
FROM node:23-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN apk add --no-cache libc6-compat && pnpm install

# Copy source for dev (mount will override anyway)
COPY . .

EXPOSE 3000
CMD ["pnpm", "dev"]