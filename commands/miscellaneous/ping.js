module.exports = {
	name: 'ping',
	description: 'Ping Pong Command!',
    aliases: ['p'],
	guildOnly: true,
	permissions: 0,
	slash: true,
	minArgs: 0, 
	usage: '',
	execute(message, args, client) {
		if(message){
			return message.channel.send('Pong.');
		}
		return `Pong!`;
	},
};