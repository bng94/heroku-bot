module.exports = {
	name: 'reboot',
	description: 'Shuts down the bot! Restarts if using PM2',
    aliases: ['restart'],
	guildOnly: false,
	permissions: 8,
    minArgs: 0, 
	usage: '',
	async execute(message, args, client) {
        let channelID = message.author.id;
        const channelTypeDM = message.channel.type === "dm" ? true : false;
        if(!channelTypeDM){
            channelID = message.channel.id;
        }
        let messageID;
        await message.channel.send("Restarting...").then(msg => messageID = msg.id);
        await client.restartLogger(channelID, messageID, channelTypeDM);
        client.commands.forEach( async cmd => {
        await client.unloadCommand(cmd);
        });
        process.exit(1);
	},
};