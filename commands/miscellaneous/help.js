/**
 * Display all commands based off the user's permission level defined in config.js
 */
const {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  ButtonStyle,
} = require("discord.js");
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
    // using the built-in functions and get the permission level of user
    const level = client.getPermissionsLevel({
      author: message.author,
      channel: message.channel,
      guild: message.guild,
      guildMember: message.member,
    });
    // filter the commands saved in new collection object
    const commands = await client.commands.filter(
      (cmd) => cmd.permissions <= level
    );
    const data = getSortedCommandArray(client, commands);

    if (!args.length) {
      // get embed with data and categorized all the commands displayed
      const embed = getInitialEmbed(data, client);
      //get rows of buttons based of cmds categories
      const row = getButtonRows(data);

      //send initial message and await
      message
        .reply({
          embeds: [embed],
          components: [row],
        })
        .then((msg) => {
          // after message was sent then listen...
          // Filter, ensures that the user who initial the help cmd call is changing the embed by their request
          const filter = (i) => i.user.id === message.author.id;
          //  Create the message component for buttons to show on embeds
          const collector = message.channel.createMessageComponentCollector({
            filter,
            time: filterTime,
          });

          //this awaits and collect responses from input of user and handle it.
          collector.on("collect", async (i) => {
            const newEmbed = getUpdateEmbed(data, i, client);

            await i.update({ embeds: [newEmbed], components: [row] });
          });

          // handles after the collection event ended
          // disable listening to btn inputs after filterTime expires
          return collector.on("end", async (collected) => {
            const lastRow = getButtonRows(data, true);
            return await msg.edit({ components: [lastRow] });
          });
        });
    } else {
      //display the command info requested from user's call
      const name = args[0].toLowerCase();
      const response = await getSingleCmd(commands, name, client);
      return message.reply(response).catch((error) => console.log(error));
    }
  },
};
/**
 *
 * @param {Client} client discord client object
 * @param {Array<string>} commands all commands based off user's permission lvl
 * formatted array of all commands categorized based off sub folder names
 * @returns
 */
const getSortedCommandArray = (client, commands) => {
  const dataArray = [];
  const prefix = Array.isArray(client.config.prefix)
    ? client.config.prefix[0]
    : client.config.prefix;
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

/**
 *
 * @param {Array<string>} data the data to display on the embed
 * @param {Client} client Discord client object
 * @returns EmbedBuilder to display
 */
const getInitialEmbed = (data, client) => {
  const categories = data.map((cat) => `**${cat.category}**`).join(`\n`);

  const defaultEmbed = new EmbedBuilder().setTitle("Help Menu").setAuthor({
    name: `${client.user.username} Help Menu`,
    iconURL: `${client.user.avatarURL()}`,
  }).setDescription(`There are ${data.length} categories!\n${categories}
Click the respective buttons to see the commands of the category.  You have ${
    filterTime / 60000
  } minutes until buttons are disabled.`);

  return defaultEmbed;
};

/**
 *
 * @param {Array<string>} data the data to display on the embed
 * @param {Number} i index of category to show
 * @param {Client} client Discord client object
 * @returns EmbedBuilder to display
 */
const getUpdateEmbed = (data, i, client) => {
  const index = data.findIndex((d) => d.category === i.customId);
  const cmds = data[index].commands
    .map((cmd) => {
      let cmdName = cmd.name
        .replace(
          Array.isArray(client.config.prefix)
            ? client.config.prefix[0]
            : client.config.prefix,
          ""
        )
        .toProperCase();
      return `**${cmdName}**\n${cmd.description}\n`;
    })
    .join("\n");

  return new EmbedBuilder()
    .setAuthor({
      name: `${client.user.username} Help Menu`,
      iconURL: `${client.user.avatarURL()}`,
    })
    .setTitle(`${data[index].category} Category`)
    .setDescription(cmds)
    .setFields({
      name: `To see a more details about a specific command type following and replace "name" with the command name:`,
      value: `/help name or ${
        Array.isArray(client.config.prefix)
          ? client.config.prefix[0]
          : client.config.prefix
      }help name`,
    });
};

/**
 *
 * @param {Array<string>} data of all commands
 * @param {Boolean} disabled the button once timer expires
 * @returns different colors variations for the component
 */
const getButtonRows = (data, disabled = false) => {
  const colorForCategory = [
    {
      name: "admin",
      color: ButtonStyle.Secondary,
    },
    {
      name: "commands",
      color: ButtonStyle.Primary,
    },
    {
      name: "miscellaneous",
      color: ButtonStyle.Success,
    },
    {
      name: "system",
      color: ButtonStyle.Secondary,
    },
  ];
  const defaultColor = ButtonStyle.Primary;

  const btnArray = data.map((res) => {
    const catName = res.category;

    const index = colorForCategory.findIndex(
      (colors) => colors.name === catName.toLowerCase()
    );
    const style = index !== -1 ? colorForCategory[index].color : defaultColor;

    return new ButtonBuilder()
      .setCustomId(catName)
      .setLabel(catName)
      .setStyle(style)
      .setDisabled(disabled);
  });

  let row = new ActionRowBuilder();

  if (btnArray.length > 0) {
    btnArray.map((btn) => row.addComponents(btn));
  }

  return row;
};

/**
 *
 * @param {Array<string>} commands listed for the users to see
 * @param {string} name of the command to lookup
 * @param {client} client Discord client object
 * @returns information about the command requested to lookup
 */
const getSingleCmd = async (commands, name, client) => {
  const prefix = Array.isArray(client.config.prefix)
    ? client.config.prefix[0]
    : client.config.prefix;
  const command = await commands.find(
    (cmd) => cmd.name === name || cmd.aliases === name
  );

  if (!command) {
    return {
      content: `The command, **${name}**
    + does not exist!`,
    };
  }

  const fieldObj = [];
  const aliases = command.aliases.join(", ");
  if (aliases.length !== 0) {
    fieldObj.push({
      name: `Aliases:`,
      value: `${aliases}`,
      inline: true,
    });
  }
  fieldObj.push({
    name: `Category:`,
    value: `${command.category}`,
    inline: true,
  });

  if (command.usage.length !== 0) {
    fieldObj.push({
      name: `Usage:`,
      value: `${prefix}${command.name} ${command.usage}`,
    });
  }
  fieldObj.push({
    name: `Slash:`,
    value: `${command.data ? `True` : `False`}`,
    inline: true,
  });
  try {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${client.user.tag}`,
        iconURL: `${client.user.avatarURL()}`,
      })
      .setTitle(`${command.name.toProperCase()} Command`)
      .setDescription(command.description)
      .setTimestamp()
      .setFields(fieldObj);

    return { embeds: [embed] };
  } catch (e) {
    console.log(e);
  }
};
