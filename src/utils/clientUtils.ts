import { Client, Message, User } from "discord.js";

interface CustomClient extends Client {
  log(msg: string | unknown, title?: string | boolean, type?: string): void;
  sendOwnerMsg(msg: string): Promise<Message>;
  awaitReply(
    msg: Message,
    question: string,
    limit: number
  ): Promise<string | boolean | undefined>;
  getUserFromMention(mention: string): User | undefined;
  clean(client: Client, text: string): Promise<string>;
}

/**
 * Loading our custom client functions
 */
export const functions = (client: CustomClient) => {
  client.log = (
    msg: string,
    title: boolean | string = false,
    type: string = "log"
  ) => {
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
  client.sendOwnerMsg = async (msg: string) => {
    const owner = await client.users.fetch(client.config.ownerID);
    return owner.send({
      content: msg,
    });
  };
  client.awaitReply = async (
    msg: Message,
    question: string,
    limit: number = 60000
  ): Promise<string | boolean | undefined> => {
    const filter = (m: Message) => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages({
        filter,
        max: 1,
        time: limit,
        errors: ["time"],
      });
      return collected.first()?.content;
    } catch (e) {
      return false;
    }
  };
  client.getUserFromMention = (mention: string): User | undefined => {
    if (!mention) return;
    const matches = mention.toString().match(/^<@!?(\d+)>$/);
    if (!matches) return;
    const id = matches[1];
    return client.users.cache.get(id);
  };
  client.clean = async (client: Client, text: string): Promise<string> => {
    if (text && text.constructor.name == "Promise") text = await text;
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 0 });

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(
        client.config.token,
        "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0"
      );

    return text;
  };
};

export default CustomClient;
