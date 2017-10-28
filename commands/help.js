exports.run = (client, message, args) => {
    if (!args[0]) {
      message.author.send(`= Command List =\n\n[Use ~help <commandname> for details]\n\n${client.commands.map(c=>`${c.help.name}:: ${c.help.description}`).join("\n")}`,{code:"asciidoc"} );
      message.author.react(":thumbsup:");
  } else {
    let command = args[0];
    if(client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send(`= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`,{code:"asciidoc"});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp'],
  permLevel: 0
};

exports.help = {
  name : "help",
  description: "Returns page details from root's awesome client guide.",
  usage: "help [command]"
};