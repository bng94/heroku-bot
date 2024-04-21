import { Client, Message, version } from "discord.js";
import moment from "moment";

require("moment-duration-format");
module.exports = {
  name: "stats",
  description: "Display bot statistics!",
  aliases: ["stat"],
  guildOnly: true,
  permissions: 0,
  usage: "",
  minArgs: 0,
  execute(message: Message, args: string[], client: Client) {
    const duration = moment.duration(client.uptime).asDays();
    message.channel.send({
      content: `= STATISTICS =
      • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
        2
      )} MB
      • Uptime     :: ${duration}
      • Users      :: ${client.users.cache.size.toLocaleString()}
      • Servers    :: ${client.guilds.cache.size.toLocaleString()}
      • Channels   :: ${client.channels.cache.size.toLocaleString()}
      • Node       :: ${process.version}
      • Discord.js :: v${version}`,
    });
  },
};
