const path = require('path');
const directory = path.basename(__dirname);

module.exports = {
	name: 'setgame',
	description: 'Set Status of the bot!',
    category: directory,
    aliases: [],
	guildOnly: true,
	permissions: 10,
    minArgs: 1,
	usage: '<action>',
	execute(message, args, client) {
        let action = message.content.split(' ').slice(1).join(' ');
        client.user.setActivity(action);
	},
};