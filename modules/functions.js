module.exports = (client) => {
  /**
   * This is my own unique console log for logging message
   * @param {string} msg message to be logged
   * @param {string} title title of the log, if title is a boolean value of true then its an error log
   * @param {string} type what type of log is this
   */
  client.log = (msg, title = false, type = "log") => {
      if(title === true){
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
   * This is used to send the bot owner a specific message
   * I use this to send myself a message when the bot reboots, startup or a specific error occurs
   * @param {string} msg message to sent to bot owner
   * @returns 
   */
  client.sendOwnerMsg = async (msg) =>{
      const owner = await client.users.fetch(client.config.ownerID);
          return owner.send({
            content: msg
          });
  };  
  
  /**
   * 
   * @param {Message} msg the message object used to send a message
   * @param {string} question the question to ask and await for a response
   * @param {number} limit The time limit to wait for a response
   * @returns 
   */
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m=>m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };

  /**
   * Grabs the mentioned user's ID from parameter var and return the user object. If mention is null then return
   */
  client.getUserFromMention = (mention) => {  
    if(!mention) return;
    const matches = mention.toString().match(/^<@!?(\d+)>$/);
    if((mention.length >= 17 && !isNaN(mention)) && !matches){
      return client.users.cache.get(mention);
    } else if (!matches) return;
  
    const id = matches[1];
    return client.users.cache.get(id);
  };
  
  /*
  MESSAGE CLEAN FUNCTION

  "Clean" removes @everyone pings, as well as tokens, and makes code blocks
  escaped so they're shown more easily. As a bonus it resolves promises
  and stringifies objects!
  This is mostly only used by the Eval and Exec commands.
  */
  client.clean = async (client, text) => {
      if (text && text.constructor.name == "Promise")
        text = await text;
      if (typeof evaled !== "string")
        text = require("util").inspect(text, {depth: 0});
  
      text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
        .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");
  
      return text;
  };
};
