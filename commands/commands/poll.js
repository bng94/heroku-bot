const Discord = require("discord.js");

module.exports = {
  name: "poll",
  description: "Poll something!",
  aliases: [],
  guildOnly: true,
  permissions: 0,
  minArgs: 1,
  usage:
    "<title> / <description> / <OPTIONAL: up to 10 unique answer choices> ",
  execute(message, args, client, level) {
    const array = args.join(" ");
    const split = "/";
    const lettersEmojis = [
      "🇦",
      "🇧",
      "🇨",
      "🇩",
      "🇪",
      "🇫",
      "🇬",
      "🇭",
      "🇮",
      "🇯",
    ];

    let index = array.indexOf(split);
    let title;
    let description;
    if (index === -1) {
      title = array;
      description = "";
    } else {
      title = array.substring(0, index);
      description = array.substring(index + 1);
    }
    if (title.length > 256)
      return message.channel.reply(
        "Title length cannot exceed 256 characters!"
      );
    let embed = new Discord.MessageEmbed().setTimestamp().setTitle(`${title}`);

    let descIndex = description.indexOf(split);
    if (descIndex === -1) {
      embed.setFooter({
        text: `${message.author.tag}`,
        iconURL: message.author.displayAvatarURL(),
      });
      if (description.length > 2048)
        return message.reply(
          "Your Description is too long! Max characters is 2048!"
        );
      embed.setDescription(`${description}`);
      embed.addField(`${lettersEmojis[0]} Yes`, `\u200b`);
      embed.addField(`${lettersEmojis[1]} No`, `\u200b`);
      message.channel
        .send({
          embeds: [embed],
        })
        .then((msg) => {
          msg.react(lettersEmojis[0]);
          setTimeout(() => {
            msg.react(lettersEmojis[1]);
          }, 750);
        });
    } else {
      let answers = [];
      let answersArray = description;
      description = answersArray.substring(0, descIndex);
      answersArray = answersArray.substring(descIndex + 1);
      let i = 0;
      let startPoint = 0;
      descIndex = answersArray.indexOf(split);
      /**
       * We loop through all the different answers choices and then put each separate choices into an array to be used later.
       */
      do {
        let results = answersArray.substring(startPoint + 1, descIndex);
        answers[i] = results;
        answersArray = answersArray.substring(descIndex + 1);
        descIndex = answersArray.indexOf(split);
        i++;
        console.log(descIndex);
      } while (descIndex != -1);
      answers[i] = answersArray;
      if (answers.length < 1 || answers.length > 10)
        return message.reply(
          `You must give between 2 and 10 different answer choices!`
        );

      embed.setFooter({
        text: `${message.author.tag}`,
        iconURL: message.author.displayAvatarURL()
      });
      if (description.length > 2048)
        return message.reply(
          "Your Description is too long! Max characters is 2048!"
        );
      embed.setDescription(`${description}`);

      const addTime = 1000;
      let startTime = 0;

      for (let i = 0; i < answers.length; i++) {
        embed.addField(`${lettersEmojis[i]} ${answers[i]}`, `\u200b`);
      }
      message.channel
        .send({
          embeds: [embed],
        })
        .then((msg) => {
          for (let i = 0; i < answers.length; i++) {
            setTimeout(() => {
              msg.react(lettersEmojis[i]);
            }, startTime);
            //this ensure the order of emojis reacted to the embed, is in order.
            startTime += addTime;
          }
        });
    }
    return message.delete();
  },
};
