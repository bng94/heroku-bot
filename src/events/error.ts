import { ErrorEvent, Events } from "discord.js";

module.exports = {
  name: Events.Error,
  execute(e: ErrorEvent) {
    console.log(`============== ERROR ==============`);
    console.log(`Error caught at ${new Date()}`);
    console.log(e);
    console.log(`============ END ERROR ============`);
  },
};
