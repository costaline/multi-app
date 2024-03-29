# BUILDER
FROM node:18.12.0-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=chat --docker

# INSTALLER
# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install
# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=chat...

# RUNNER
FROM node:18.12.0-alpine AS runner
RUN apk update && apk add bash
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 some_group
RUN adduser --system --uid 1001 some_user
USER some_user

COPY --from=installer /app/apps/chat/dist .
