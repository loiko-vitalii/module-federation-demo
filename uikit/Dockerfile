# Base stage with dependencies
FROM node:22-alpine as base

WORKDIR /app

# Copy workspace configuration files from ROOT directory
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY uikit/package.json ./uikit/

# Install pnpm
RUN npm install -g pnpm

# Install dependencies for the whole workspace
RUN pnpm install --frozen-lockfile

# Copy uikit source code
COPY uikit/ ./uikit/
WORKDIR /app/uikit

# Development stage
FROM base as development
EXPOSE 3003
CMD ["pnpm", "dev", "--host", "0.0.0.0"]

# Build stage
FROM base as builder
RUN pnpm build

# Production stage
FROM nginx:alpine as production
COPY --from=builder /app/uikit/dist /usr/share/nginx/html
COPY uikit/nginx.conf /etc/nginx/nginx.conf
EXPOSE 3003
CMD ["nginx", "-g", "daemon off;"]
