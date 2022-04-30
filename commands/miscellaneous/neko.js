const path = require("path");
const directory = path.basename(__dirname);
const fetch = require("node-fetch");

module.exports = {
  name: "neko",
  description: "Random Anime Neko Girl Picture!",
  category: directory,
  aliases: [],
  guildOnly: true,
  slash: true,
  permissions: 0,
  minArgs: 0,
  usage: "",
  async execute(message) {
    const fileUrl = await apiCall();
    return message.channel.send({ files: [fileUrl] }).catch(console.error);
  },
  async interactionReply(interaction) {
    const fileUrl = await apiCall();
    return await interaction.reply({
      files: [fileUrl],
      ephemeral: true,
    });
  },
};

/**
 * create a method to call the neko API, so no duplicate code for the two
 * function call for slash and regular cmd
 */
const apiCall = async () => {
  const response = await fetch(`https://nekos.life/api/v2/img/neko`);
  const data = await response.json();
  return data.url;
};
