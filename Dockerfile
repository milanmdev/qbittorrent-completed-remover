FROM node:lts

LABEL org.opencontainers.image.description "Remove completed (paused) qBittorrent torrents"
LABEL org.opencontainers.image.source "https://github.com/milanmdev/qbittorrent-completed-remover"

WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
CMD yarn start