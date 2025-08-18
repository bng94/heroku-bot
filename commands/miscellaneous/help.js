/**
 * Display all commands based off the user's permission level defined in config.js
 */
const {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  ButtonStyle,
} = require("discord.js");

const customIds = [
  "dfh_help_1",
  "dfh_help_2",
  "dfh_help_3",
  "dfh_help_4",
  "dfh_help_5",
];

module.exports = {
  name: "help",
  description: "List all of my commands or info about a specific command.",
  aliases: ["commands"],
  customIds,
  maxArgs: 1,
  usage: "<command name>",
  async executePrefix(message, args, client) {
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
      message.reply({
        embeds: [embed],
        components: [row],
      });
    } else {
      //display the command info requested from user's call
      const name = args[0].toLowerCase();
      const response = await getSingleCmd(commands, name, client);
      return message.reply(response).catch((error) => console.log(error));
    }
  },
  async execute(interaction, client, level) {
    await interaction.deferReply({
      ephemeral: true,
    });
    const { options } = interaction;
    const name = options.getString("cmd_name");

    const commands = await client.commands.filter(
      (cmd) => cmd.permissions <= level
    );
    const data = getSortedCommandArray(client, commands);

    if (!name) {
      const embed = getInitialEmbed(data, client);
      const row = getButtonRows(data);

      await interaction.editReply({
        embeds: [embed],
        components: [row],
      });
    } else {
      //display the command info requested from user's call
      const response = await getSingleCmd(commands, name, client);
      return await interaction
        .editReply(response)
        .catch((error) => console.log(error));
    }
  },
  async customIdInteraction(interaction, client, level) {
    const commands = await client.commands.filter(
      (cmd) => cmd.permissions <= level
    );
    const data = getSortedCommandArray(client, commands);
    const customId = interaction.customId;
    try {
      if (customIds.includes(customId)) {
        const newEmbed = getUpdateEmbed(data, customId, client);

        await interaction.update({ embeds: [newEmbed] });
      } else {
        console.log("Invalid category: " + customId, data);
        await interaction.reply({ content: "Invalid category: " + customId });
      }
    } catch (error) {
      console.error("Error handling customIdInteraction:", error);
      await interaction
        .reply({
          content: "An error occurred while processing your request.",
          ephemeral: true,
        })
        .catch(() => {});
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
      customId:
        dataArray.length < 5
          ? customIds[dataArray.length]
          : `dfh_help_${dataArray.length}`,
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
Click the respective buttons to see the commands of the category. `);

  return defaultEmbed;
};

/**
 *
 * @param {Array<string>} data the data to display on the embed
 * @param {Number} customId index of category to show
 * @param {Client} client Discord client object
 * @returns EmbedBuilder to display
 */
const getUpdateEmbed = (data, customId, client) => {
  const index = data.findIndex((d) => d.customId === customId);
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

  const btnArray = data.map((res, i) => {
    const catName = res.category;

    const index = colorForCategory.findIndex(
      (colors) => colors.name === catName.toLowerCase()
    );
    const style = index !== -1 ? colorForCategory[index].color : defaultColor;

    return new ButtonBuilder()
      .setCustomId(res.customId)
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
    (cmd) =>
      cmd.name === name ||
      (Array.isArray(cmd.aliases) && cmd.aliases.includes(name))
  );

  const slashCommand = await commands.find(
    (cmd) => cmd.data && cmd.data.name === name
  );

  if (slashCommand) {
    const fieldObj = [];
    fieldObj.push({
      name: `Category:`,
      value: `${slashCommand.category}`,
      inline: true,
    });

    fieldObj.push({
      name: `Usage:`,
      value: `/${slashCommand.name}`,
      inline: true,
    });
    if (slashCommand.executePrefix) {
      fieldObj.push({
        name: `Using prefix:`,
        value: `${prefix}${slashCommand.name} ${slashCommand.usage}${
          slashCommand.aliases
            ? `,  ${prefix}${slashCommand.aliases.join(`, ${prefix}`)}`
            : ""
        }`,
      });
    }
    try {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${client.user.tag}`,
          iconURL: `${client.user.avatarURL()}`,
        })
        .setTitle(`${slashCommand.data.name.toProperCase()} Command`)
        .setDescription(slashCommand.data.description)
        .setTimestamp()
        .setFields(fieldObj);

      return { embeds: [embed] };
    } catch (e) {
      console.log(e);
    }
  } else if (command) {
    const fieldObj = [];
    const aliases = command.aliases ? command.aliases.join(", ") : null;
    if (aliases) {
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
  } else {
    return {
      content: `The command, **${name}**
    + does not exist!`,
    };
  }
};
