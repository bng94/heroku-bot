module.exports = {
	name: 'reboot',
	description: 'Shuts down the bot! Restarts if using PM2',
    aliases: ['restart'],
	guildOnly: false,
	permissions: 8,
    minArgs: 0, 
	usage: '',
	async execute(message, args, client) {
    await message.reply("Bot is restarting.");
    client.commands.forEach( async cmd => {
      await client.unloadCommand(cmd);
    });
    process.exit(1);
	},
};