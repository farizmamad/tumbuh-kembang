# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app

FROM base AS install
WORKDIR /temp/dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

FROM base AS test
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
RUN npm run test

FROM base AS release
ENV NODE_ENV=production
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
EXPOSE 3000
CMD node dist/main.js