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
		prefix = client.config.prefix;

        const commands = client.commands.filter(function(cmd){ 
            if (cmd.permissions <= level) return cmd 
        });
        const commandNames = commands.map(cmd => cmd.name);
        const longestName = commandNames.reduce(function (a, b) {
            return a.length > b.length ? a : b;
        });
        const longestLength = longestName.length;
        const sorted = commands.sort((p, c) => p.category > c.category ? 1 :  p.name > c.name && p.category === c.category ? 1 : -1 );

        if (!args.length) {
            message.react("👍");
            data.push('Here\'s a list of all my commands:');
            let category;
            data.push(sorted.map(command => {
                let response = "";
                if (!category || category != command.category) {
                    category = command.category;
                    categoryChanged = true; 
                } else {
                    categoryChanged = false;
                }

                if(categoryChanged) response += `\n===== ${category} =====\n`;
                response += `${prefix}${command.name}${" ".repeat(longestLength - command.name.length)} :: ${command.description}`;
                return response;
            }).join("\n"));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.author.send(data, { 
                split: true, 
                code:"asciidoc" 
            }).then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('I\'ve sent you a DM with all my commands!');
            })
            .catch(error => {
                console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
            });
        }

        const name = args[0].toLowerCase();
        const command = commands.find(cmd => cmd.name === name || cmd.aliases === name);
        if (!command) {
            return message.reply('that\'s not a valid command!');
        }
        data.push(`**Category:** ${command.category}`);
        data.push(`**Name:** ${command.name}`);

        if (command.aliases.length) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });
	},
};