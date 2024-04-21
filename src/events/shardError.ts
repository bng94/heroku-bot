import { Events } from "discord.js";

module.exports = {
  name: Events.ShardError,
  async execute(error: Error) {
    console.error("A websocket connection encountered an error:", error);
  },
};
