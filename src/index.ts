import "dotenv/config";
import { qBittorrentClient } from "@robertklep/qbittorrent";

let credentials = {
  username: process.env.USERNAME || "admin",
  password: process.env.PASSWORD || "adminadmin",
};

const client = new qBittorrentClient(
  process.env.CLIENT || "http://127.0.0.1:8080",
  credentials.username,
  credentials.password
);

main(); // Run the main function once when the script starts
console.log("Starting the removal timer (running every 5 minutes)");
setInterval(function () {
  main();
}, 5 * 60 * 1000);

async function main() {
  client.auth.login(credentials.username, credentials.password); // Be sure that the client is still logged in when running the main function
  let torrents = await client.torrents.info();

  for (let torrent of torrents) {
    if (torrent.state == "pausedUP" && torrent.amount_left == 0) {
      console.log(`Removing torrent \`${torrent.name}\``);
      await client.torrents.delete(torrent.hash, true).catch((err) => {
        console.error(`Unable to remove torrent \`${torrent.name}\`: ${err}`);
      });
    } else {
      continue;
    }
  }
}
