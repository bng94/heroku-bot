const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const filterTime = 60000;

module.exports = {
  name: "help",
  description: "List all of my commands or info about a specific command.",
  aliases: ["commands"],
  permissions: 0,
  minArgs: 0,
  maxArgs: 1,
  usage: "<command name>",
  async execute(message, args, client) {
    const level = client.getPermissionsLevel(message);
    const commands = client.commands.filter((cmd) => cmd.permissions <= level);
    const data = getAllCommandsArray(client, commands);

    if (!args.length) {
      message.react("👍");
      const embed = getDefaultEmbed(data, client);
      const row = getRowOfButtons(data);

      message.channel
        .send({
          embeds: [embed],
          components: [row],
        })
        .then((msg) => {
          const filter = (i) => i.user.id === message.author.id;
          const collector = message.channel.createMessageComponentCollector({
            filter,
            time: filterTime,
          });

          collector.on("collect", async (i) => {
            const newEmbed = getUpdateEmbed(data, i, client);

            await i.update({ embeds: [newEmbed], components: [row] });
          });

          return collector.on("end", async (collected) => {
            const lastRow = getRowOfButtons(data, true);
            return await msg.edit({ components: [lastRow] });
          });
        });
    } else {
      message.react("👌");
      const name = args[0].toLowerCase();
      const response = await getSingleCmd(commands, name, client);
      return message.channel
        .send(response)
        .catch((error) => console.log(error));
    }
  },
};

const getAllCommandsArray = (client, commands) => {
  const dataArray = [];
  const prefix = client.config.prefix;
  const commandNames = commands.map((cmd) => cmd.name);
  const longestName = commandNames.reduce(function (a, b) {
    return a.length > b.length ? a : b;
  });
  const sorted = commands.sort((p, c) =>
    p.category > c.category
      ? 1
      : p.name > c.name && p.category === c.category
      ? 1
      : -1
  );
  let category = "";
  let index = -1;
  sorted.map((command) => {
    let temp = {
      category: "",
      commands: [],
    };
    if (!category || category != command.category) {
      category = command.category;
      temp = { ...temp, category };
      dataArray.push(temp);
    }

    index = dataArray.findIndex((element) => element.category === category);
    temp = dataArray[index];

    temp.commands.push({
      name: `${prefix}${command.name}`,
      description: `${command.description}`,
    });
    dataArray[index] = temp;
  });

  return dataArray;
};

const getDefaultEmbed = (data, client) => {
  const categories = data.map((cat) => `**${cat.category}**`).join(`\n`);

  const defaultEmbed = new MessageEmbed()
    .setTitle("Help Menu")
    .setAuthor({
      name: `${client.user.username} Help Menu`,
      iconURL: `${client.user.avatarURL()}`,
    }).setDescription(`There are ${data.length} categories!\n${categories}
Click the respective buttons to see the commands of the category.  You have ${
    filterTime / 60000
  } minutes until buttons are disabled.`);

  return defaultEmbed;
};

const getUpdateEmbed = (data, i, client) => {
  const index = data.findIndex((d) => d.category === i.customId);
  const cmds = data[index].commands
    .map((cmd) => {
      let cmdName = cmd.name.replace(client.config.prefix, "").toProperCase();
      return `**${cmdName}**\n${cmd.description}\n`;
    })
    .join("\n");

  return new MessageEmbed()
    .setAuthor({
      name: `${client.user.username} Help Menu`,
      iconURL: `${client.user.avatarURL()}`,
    })
    .setTitle(data[index].category)
    .setDescription(cmds)
    .setFields({
      name: `To see a more details about a specifc command type following and replace "name" with the command name:`,
      value: `/help name or ${client.config.prefix}help name`,
    });
};

const getRowOfButtons = (data, disabled = false) => {
  // admin, commands, misc, system

  const colorForCategory = [
    {
      name: "admin",
      color: "SECONDARY",
    },
    {
      name: "commands",
      color: "PRIMARY",
    },
    {
      name: "miscellaneous",
      color: "SUCCESS",
    },
    {
      name: "system",
      color: "SECONDARY",
    },
  ];
  const defaultColor = "PRIMARY";

  const btnArray = data.map((res) => {
    const catName = res.category;

    const index = colorForCategory.findIndex(
      (colors) => colors.name === catName.toLowerCase()
    );
    const style = index !== -1 ? colorForCategory[index].color : defaultColor;

    return new MessageButton()
      .setCustomId(catName)
      .setLabel(catName)
      .setStyle(style)
      .setDisabled(disabled);
  });

  let row = new MessageActionRow();

  if (btnArray.length > 0) {
    btnArray.map((btn) => row.addComponents(btn));
  }

  return row;
};

const getSingleCmd = async (commands, name, client) => {
  const command = await commands.find(
    (cmd) => cmd.name === name || cmd.aliases === name
  );
  if (!command) {
    return { content: "that's not a valid command!" };
  }

  const fieldObj = [];
  if (command.aliases.length)
    fieldObj.push({
      name: `Aliases:`,
      value: `${command.aliases.join(", ")}`,
      inline: true,
    });

  fieldObj.push({
    name: `Category:`,
    value: `${command.category}`,
    inline: true,
  });

  if (command.usage)
    fieldObj.push({
      name: `Usage:`,
      value: `${prefix}${command.name} ${command.usage}`,
    });
  fieldObj.push({
    name: `Slash:`,
    value: `${command.slash ? `True` : `False`}`,
    inline: true,
  });
  fieldObj.push({
    name: `Cooldown:`,
    value: `${command.cooldown || 3} second(s)`,
    inline: true,
  });
  const embed = new MessageEmbed()
    .setAuthor({
      name: `${client.user.tag}`,
      iconURL: `${client.user.avatarURL()}`,
    })
    .setTitle(`${command.name.toProperCase()} Category`)
    .setDescription(command.description)
    .setTimestamp()
    .setFields(fieldObj);

  return { embeds: [embed] };
};
