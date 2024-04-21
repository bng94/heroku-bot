import { Events } from "discord.js";

module.exports = {
  name: Events.Warn,
  execute(info: string) {
    console.log(`============== WARN ==============`);
    console.log(`Warn: ${new Date()}`);
    console.log(info);
    console.log(`============ END WARN ============`);
  },
};
