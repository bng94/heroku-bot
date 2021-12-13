const Discord = require("discord.js");

module.exports = {
	name: 'messageCreate',
	execute(message, client) {
        prefix = client.config.prefix;
        if(message.author.bot) return;

        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

        const level = client.permissionsLevel(message);

        if (!cmd) return;

        client.log(`${message.content}`, `${message.author.tag}`, `Command Call`);
        if (cmd.guildOnly && message.channel.type === 'dm') {
            return message.reply('I can\'t execute that command inside DMs!');
        }

        const cmdPermissions = isNaN(cmd.permissions) ? client.levelCache[cmd.permissions] : cmd.permissions;

        if (level < cmdPermissions) {
          const embed = new Discord.MessageEmbed()
              .setColor(0x00AE86)
              .setTimestamp()
              .setTitle(`Permission Denied!`)
              .setDescription(`You do not have permission to use this command.
            Your permission level is ${level} (${client.config.permissions.find(l => l.level === level).name}). \nThis command requires level ${client.config.permissions.find(l => l.level === cmd.permissions).name} (${cmd.permissions})`);
          try{
            return message.channel.send({ 
              embeds: [embed]
            });
          }catch(e){
            console.log(e);
            return message.channel.send(`You do not have permission to use this command.
            Your permission level is ${level} (${client.config.permissions.find(l => l.level === level).name})
            This command requires level ${client.config.permissions.find(l => l.level === cmd.permissions).name}} (${cmd.permissions})`);
          }
        } 

        //Check if cmd usage does NOT meet the usage criteria then return 
        if( ((!cmd.maxArgs || cmd.maxArgs === -1) && args.length < cmd.minArgs)
        || ((cmd.maxArgs && cmd.maxArgs != -1) && (args.length < cmd.minArgs || args.length > cmd.maxArgs))) {
          return message.channel.send(`Incorrect syntax usage! ${prefix}${command} ${cmd.usage}`);
        }

        try {
            cmd.execute(message, args, client, level);
        } catch (e) {
            client.log(e, true)
            message.reply('There was an error trying to execute that command!');
        }
	},
};