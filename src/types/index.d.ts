import { Client, Message, User } from "discord.js";

declare module "discord.js" {
  interface Client {
    /**
     * Custom logging function.
     * Logs a message to the console with optional title and log type.
     * @param {string} msg Message to be logged.
     * @param {boolean|string} title Title of the log. If true, it's treated as an error log.
     * @param {string} type Type of log (e.g., 'log', 'info', 'error').
     */
    log(msg: string, title?: string | boolean, type?: string): void;

    /**
     * Sends a message to the bot owner.
     * @param {string} msg Message to be sent to the bot owner.
     * @returns {Promise<Message>} A promise that resolves to the message sent to the bot owner.
     */
    sendOwnerMsg(msg: string): Promise<Message>;

    /**
     * Asks a question and awaits a reply from the same user.
     * @param {Message} msg The message object used to send a message.
     * @param {string} question The question to ask and await a response.
     * @param {number} limit The time limit to wait for a response in milliseconds (default is 60,000ms).
     * @returns {Promise<string|boolean>} A promise that resolves to the user's response or false if no response is received within the time limit.
     */
    awaitReply(
      msg: Message,
      question: string,
      limit: number
    ): Promise<string | boolean | undefined>;

    /**
     * Gets a user object from a mention string.
     * @param {string} mention The mention string.
     * @returns {User|undefined} The user object corresponding to the mention, or undefined if the mention is invalid or null.
     */
    getUserFromMention(mention: string): User | undefined;

    /**
     * Cleans a string by escaping special characters and removing sensitive information.
     * Used for displaying messages in a safe manner (e.g., in the Eval and Exec commands).
     * @param {string} text The text to clean.
     * @returns {Promise<string>} The cleaned text.
     */
    clean(client: Client, text: string): Promise<string>;
  }
}

interface BotClient extends Client {
  /**
   *
   * @param msg
   * @param title
   * @param type
   */
  log(msg: string, title?: string | boolean, type?: string): void;
  /**
   * Sends a message to the bot owner.
   */
  sendOwnerMsg(msg: string): Promise<Message>;
  awaitReply(
    msg: Message,
    question: string,
    limit: number
  ): Promise<string | boolean | undefined>;
  getUserFromMention(mention: string): User | undefined;
  clean(client: Client, text: string): Promise<string>;
}

export default BotClient;
