FROM node:lts-slim

LABEL org.opencontainers.image.description="Remove completed (paused/stopped) qBittorrent torrents"
LABEL org.opencontainers.image.source="https://github.com/milanmdev/qbittorrent-completed-remover"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
WORKDIR /build
COPY . .

RUN pnpm install --frozen-lockfile

CMD ["pnpm", "start"]