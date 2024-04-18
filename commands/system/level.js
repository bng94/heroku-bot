module.exports = {
  name: "level",
  description: "Tells you your permission level for the bot.",
  aliases: ["mylevel"],
  permissions: 0,
  minArgs: 0,
  usage: "",
  execute(message, args, client, level) {
    const title = client.config.permissions.find((l) => l.level === level).name;
    message.reply(`Your permission level is: ${level} - ${title}`);
  },
};
