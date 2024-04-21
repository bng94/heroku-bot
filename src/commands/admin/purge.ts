import { Message } from "discord.js";
import CustomClient from "../../utils/clientUtils";

module.exports = {
  name: "purge",
  description:
    "Delete the stated amount of messages along with the command call.",
  aliases: [],
  guildOnly: true,
  permissions: 4,
  minArgs: 1,
  usage: "<#>",
  execute(message: Message, args: string[], client: CustomClient) {
    let amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) {
      return message.channel.send(
        "Please provide a valid number of messages to delete."
      );
    }

    const limit = amount + 1; // Add 1 to include the command message
    message.channel.messages.fetch({ limit: limit }).then((messages) => {
      try {
        messages.map((msg) => {
          if (msg.deletable) {
            msg.delete();
          }
        });

        message.reply(
          `Deleted ${limit} messages, including the deletion command.`
        );
      } catch (e) {
        client.log(e, true);
        message.channel.send(
          "Failed to delete messages. This may be caused by attempting to delete messages that are over 2 weeks old."
        );
      }
    });
  },
};
