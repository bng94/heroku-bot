import { Client, Events } from "discord.js";

module.exports = {
  name: Events.ShardDisconnect,
  execute(client: Client) {
    console.log(`You have been disconnected at ${new Date()}`);
    client.destroy().then(client.login.bind(client));
  },
};
