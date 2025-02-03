# syntax=docker/dockerfile:1

FROM node:18.19-alpine AS base
WORKDIR /app

FROM base AS install
WORKDIR /temp/dev
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     --mount=type=cache,target=/root/.npm \
#     npm ci --omit=dev
COPY package.json .
COPY package-lock.json .
RUN npm ci

FROM base AS test
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
RUN npm run test

FROM base AS release
ENV NODE_ENV=production
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
EXPOSE 3000
CMD ["node", "dist/main.js"]