const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
	name: 'stats',
	description: 'Display bot statistics!',
  aliases: ['stat'],
	guildOnly: true,
	permissions: 0,
	usage: '',
  minArgs: 0,
	execute(message, args, client) {
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        message.channel.send(`= STATISTICS =
      • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
      • Uptime     :: ${duration}
      • Users      :: ${client.users.cache.size.toLocaleString()}
      • Servers    :: ${client.guilds.cache.size.toLocaleString()}
      • Channels   :: ${client.channels.cache.size.toLocaleString()}
      • Node       :: ${process.version}
      • Discord.js :: v${version}`, {code: "asciidoc"});
	},
};