# Base stage with dependencies
FROM node:22-alpine as base

WORKDIR /app

# Copy workspace configuration files from ROOT directory
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY feed/package.json ./feed/

# Install pnpm
RUN npm install -g pnpm

# Install dependencies for the whole workspace
RUN pnpm install --frozen-lockfile

# Copy uikit source code
COPY feed/ ./feed/
WORKDIR /app/feed

# Development stage
FROM base as development
EXPOSE 3002
CMD ["pnpm", "dev", "--host", "0.0.0.0"]

# Build stage
FROM base as builder
RUN pnpm build

# Production stage
FROM nginx:alpine as production
COPY --from=builder /app/feed/dist /usr/share/nginx/html
COPY feed/nginx.conf /etc/nginx/nginx.conf
EXPOSE 3002
CMD ["nginx", "-g", "daemon off;"]
