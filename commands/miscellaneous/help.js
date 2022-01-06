module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
    permissions: 0,
    minArgs: 0,
    maxArgs: 1, 
    usage: '<command name>',
	execute(message, args, client, level) {
        const data = [];
		const prefix = client.config.prefix;

        const commands = client.commands.filter(cmd => cmd.permissions <= level);
        const commandNames = commands.map(cmd => cmd.name);
        const longestName = commandNames.reduce(function (a, b) {
            return a.length > b.length ? a : b;
        });
        const longestLength = longestName.length;
        const sorted = commands.sort((p, c) => p.category > c.category ? 1 :  p.name > c.name && p.category === c.category ? 1 : -1 );
        let category = '';
        let index = -1;
        sorted.map(command => {
            let temp = {
                category: '',
                commands: []
            }
            if (!category || category != command.category) {
                category = command.category;
                temp = {...temp, category };
                data.push(temp);
            } 

            index = data.findIndex(element => element.category === category);
            temp = data[index];
            
            temp.commands.push({
                name: `${prefix}${command.name}`,
                description: `${command.description}`
            });
            data[index] = temp;
        });

        if (!args.length) {
            message.react("👍");

            return data.map(res => {
                let res_string = `\n===== ${res.category} =====\n\n`;
                res_string += res.commands.map(cmd => `${cmd.name} :: ${cmd.description}`).join('\n');
                return message.author.send(res_string);
            })
        }
        message.react("👌");

        const name = args[0].toLowerCase();
        const command = commands.find(cmd => cmd.name === name || cmd.aliases === name);
        if (!command) {
            return message.reply('that\'s not a valid command!');
        }
        let response = [];
        response.push(`**Name:** ${command.name.toProperCase()}`);

        if (command.aliases.length) response.push(`**Aliases:** ${command.aliases.join(', ')}`);
        response.push(`**Category:** ${command.category}`);
        if (command.description) response.push(`**Description:** ${command.description}`);
        if (command.usage) response.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        response.push(`**Slash:** ${command.slash ? `True` : `False`}`);
        response.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        let content = response.join('\n');

        return message.channel.send({ content: content }).catch(error => console.log(error));
	},
};