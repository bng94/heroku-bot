const time = require("@modules/time.js");
module.exports = (client) => {
  time(client);
  client.permissionsLevel = (message) => {
      let permLvl = 0;
  
      const permOrder = client.config.permissions.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);
  
      while (permOrder.length) {
        const currentLevel = permOrder.shift();
        if (currentLevel.check(message)) {
          permLvl = currentLevel.level;
          break;
        }
      }
      return permLvl;
  };

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
  
  client.sendOwnerMsg = async (msg) =>{
      const owner = await client.users.fetch(client.config.ownerID);
          return owner.send(msg);
  };  
  
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
    const matches = mention.match(/^<@!?(\d+)>$/);
    if((mention.length >= 17 && !isNaN(mention)) && !matches){
      return client.users.cache.get(mention);
    } else if (!matches) return;
  
    const id = matches[1];
    return client.users.cache.get(id);
  };

  const checkCommandErrors = (command) => {
    let error = "";
    if(typeof command.permissions === 'undefined'){
      error += `\n- Permission level is Missing!`;
    } else if(isNaN(command.permissions)){
      error += `\n- Permission level must be a Number!`;
    }

    if(typeof command.minArgs === 'undefined'){
      error += `\n- Minimum args is Missing!`;
    } else if(isNaN(command.minArgs)){
      error += `\n- MinArgs must be a Number!`;
    }

    if(typeof command.usage === 'undefined'){
      error += `\n- Command Usage is Missing!`;
    } 

    if(typeof command.description === 'undefined'){
      error += `\n- Description is Missing!`;
    } 
    return error;
  };

  //Accessible only in this file
  const getApp = (guildId) => {
    const app = client.api.applications(process.env.botID)
    if (guildId) {
      app.guilds(guildId)
    }
    return app
  }

  client.loadCommand = (file, folder, reloaded = false) => {
    try {
      const command = require(`@commands/${folder}/${file}`);
      error = checkCommandErrors(command);
      if(error != ""){
        const placeHolder = `\nRequired:`
        throw placeHolder+error;
      }

      /**
       * *Remove the need of using the following in each cmd file
       * const path = require('path');
       * const directory = path.basename(__dirname);
       * category: directory,
       * *defines their category as folderName that contains the cmd file
       */
      command.category = folder.toProperCase();
      client.commands.set(command.name, command);

      if(command.aliases){
          command.aliases.forEach(alias => {
              client.aliases.set(alias, command.name);
          });
      }
      
      if(command.slash === true) {
        let guildId = '';
        if(command.guildOnly) guildId = process.env.serverID;
        if(command.slashOptions){
          getApp(guildId).commands.post({
            data: {
              name: command.name,
              description: command.description,
              options: command.slashOptions
            },
          })
        } else {
          getApp(guildId).commands.post({
            data: {
              name: command.name,
              description: command.description,
            },
          })
        }
        //client.log(`Loading Slash Command: ${command.name}.`, `CMD`);
      }

      if(reloaded) client.log(`Loading Command: ${file}. 👌`, 'CMD');
      return false;
    } catch (e) {
        return `Unable to load command ${file}: ${e}`;
    }
  };

  //recommend test later
  client.unloadCommand = async (commandName, folderName) => {
      let command;
      if (client.commands.has(commandName)) {
        command = client.commands.get(commandName);
      } else if (client.aliases.has(commandName)) {
        command = client.commands.get(client.aliases.get(commandName));
      }
      if (!command) return `The command \`${commandName}\` doesnt seem to exist, nor is it an alias. Try again!`;
  
      if (command.shutdown) {
        await command.shutdown(client);
      }
      delete require.cache[require.resolve(`@commands/${folderName}/${commandName}.js`)];
      return false;
  };

  
  // `await client.wait(1000);` to "pause" for 1 second.
  client.wait = require("util").promisify(setTimeout);
  
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

  // <String>.toPropercase() returns a proper-cased string such as:
  // "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  // <Array>.random() returns a single random element from an array
  // [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
  };
  
    
};
