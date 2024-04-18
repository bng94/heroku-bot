module.exports = (client) => {
  /**
   * Custom logging function.
   * Logs a message to the console with optional title and log type.
   * @param {string} msg Message to be logged.
   * @param {boolean|string} title Title of the log. If true, it's treated as an error log.
   * @param {string} type Type of log (e.g., 'log', 'info', 'error').
   */
  client.log = (msg, title = false, type = "log") => {
    if (title === true) {
      console.log(`========== ERROR ==========`);
      console.log(`[${new Date()}]:`);
      console.log(`===========================`);
      console.log(`${msg}`);
      console.log(`=========== END ===========`);
    } else {
      console.log(`[${type}] [${title}] ${msg}`);
    }
  };

  /**
   * Sends a message to the bot owner.
   * @param {string} msg Message to be sent to the bot owner.
   * @returns {Promise<Message>} A promise that resolves to the message sent to the bot owner.
   */
  client.sendOwnerMsg = async (msg) => {
    const owner = await client.users.fetch(client.config.ownerID);
    return owner.send({
      content: msg,
    });
  };

  /**
   * Asks a question and awaits a reply from the same user.
   * @param {Message} msg The message object used to send a message.
   * @param {string} question The question to ask and await a response.
   * @param {number} limit The time limit to wait for a response in milliseconds (default is 60,000ms).
   * @returns {Promise<string|boolean>} A promise that resolves to the user's response or false if no response is received within the time limit.
   */
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = (m) => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, {
        max: 1,
        time: limit,
        errors: ["time"],
      });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };

  /**
   * Gets a user object from a mention string.
   * @param {string} mention The mention string.
   * @returns {User|undefined} The user object corresponding to the mention, or undefined if the mention is invalid or null.
   */
  client.getUserFromMention = (mention) => {
    if (!mention) return;
    const matches = mention.toString().match(/^<@!?(\d+)>$/);
    if (!matches) return;
    const id = matches[1];
    return client.users.cache.get(id);
  };

  /**
   * Cleans a string by escaping special characters and removing sensitive information.
   * Used for displaying messages in a safe manner (e.g., in the Eval and Exec commands).
   * @param {string} text The text to clean.
   * @returns {string} The cleaned text.
   */
  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise") text = await text;
    if (typeof evaled !== "string")
      text = require("util").inspect(text, { depth: 0 });

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(
        client.token,
        "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0"
      );

    return text;
  };
};
