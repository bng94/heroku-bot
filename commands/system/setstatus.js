module.exports = {
	name: 'setstatus',
	description: 'Set Status of the bot!',
	aliases: ['ss'],
	guildOnly: true,
	permissions: 10,
    minArgs: 1,
	usage: '<on|idle|invisible|dnd>',
	async execute(message, args, client) {
		let newStatus = args.join(' ');
		const status = {
            'on': true,
            'idle': true,
            'invisible': true,
            'dnd': true
        };
		if(!status[newStatus]) newStatus = 'on';
		await client.user.setStatus(newStatus);
		message.channel.send(`Bot is now **${client.user.presence.status}**`);
	},
};