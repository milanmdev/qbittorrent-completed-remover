import "dotenv/config";
import { QBittorrent } from "@ctrl/qbittorrent";

let credentials = {
  username: process.env.USERNAME || "admin",
  password: process.env.PASSWORD || "adminadmin",
};

const client = new QBittorrent({
  baseUrl: process.env.CLIENT || "http://127.0.0.1:8080",
  username: credentials.username,
  password: credentials.password,
});

main(); // Run the main function once when the script starts
console.log("Starting the removal timer (running every 5 minutes)");
setInterval(
  function () {
    main();
  },
  5 * 60 * 1000
);

async function main() {
  await client.login(); // Be sure that the client is still logged in when running the main function
  let torrents = await client.listTorrents();
  if (process.env.LOGGING == "verbose") {
    if (torrents.length > 0) {
      console.log("Currently active torrents:");
      for (let torrent of torrents) {
        console.log(
          `- \"${torrent.name}\" (${torrent.state}) - ${torrent.amount_left} bytes left`
        );
      }
    } else {
      console.log("No active torrents found.");
    }
  }

  for (let torrent of torrents) {
    if (
      ["pausedUP", "stoppedUP"].includes(torrent.state) &&
      torrent.amount_left == 0
    ) {
      console.log(`Removing torrent \`${torrent.name}\``);
      await client
        .removeTorrent(torrent.hash, true)
        .catch((err) => {
          console.error(`Unable to remove torrent \`${torrent.name}\`: ${err}`);
        })
        .then(() => {
          if (process.env.LOGGING == "verbose") {
            console.log(`Torrent \`${torrent.name}\` removed successfully.`);
          }
        });
    } else {
      continue;
    }
  }
}
