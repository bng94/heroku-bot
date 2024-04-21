import { Events } from "discord.js";

module.exports = {
  name: Events.ShardResume,
  execute(id: number, replayedEvents: number) {
    console.log(
      `Whenever a WebSocket resumes, at ${new Date()}` + replayedEvents
    );
  },
};
