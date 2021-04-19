const path = require('path');
const directory = path.basename(__dirname);
const fetch = require('node-fetch');

module.exports = {
	name: 'neko',
	description: 'Random Anime Neko Girl Picture!',
    category: directory,
    aliases: [],
	guildOnly: true,
	permissions: 0,
	minArgs: 0, 
	usage: '',
	execute(message, args, client) {
		fetch(`https://nekos.life/api/v2/img/neko`).then(res => res.json()).then(body => message.channel.send({ files: [body.url] }).catch(console.error));
	},
};