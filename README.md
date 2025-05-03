# qbittorrent-completed-remover

Remove completed (paused/stopped) qBittorrent torrents

## Why? (Use Case)

When I've seeded a torrent to 3 weeks or to a 3:1 ratio (whichever comes first), my qBittorrent client is set to pause the torrent. Since I don't want to keep the files and torrent on my system any longer, this script will allow me to automate the removal of those completed torrents.

## Usage

1. Use the `docker-compose.example.yml` file to create a `docker-compose.yml` file.
2. Update the `docker-compose.yml` file with your qBittorrent credentials (username and password). Update the `CLIENT` (qBittorrent host) variable if you need to.
3. Run `docker-compose up -d` to start the container.

The script will run every 5 minutes and will remove the torrent + the files if it has a "paused" status as well as if it's done downloading.
