# Heroku Discord Bot
A Discord.js demo bot for my npm package called Discord-Features-Handler.

## Description
This is a generic bot for everyone to download and use. Since the creation of my DiscordFeaturesHandler npm package, I am converting this to be more geared towards a demo bot for those interested in a basic Discord.js bot setup with the package. Originally, it was a bot hosted on Heroku but has been converted into a demo bot.

(Note: Heroku is stopping all free services starting Nov 28, 2022, and requires paid plans to continue services)

If interested in using ***TypeScript*** for this bot, check out the TypeScript branch

## Installation

If you clone or fork my repository, make sure to run:

```bash
 npm install
```
## Create your Environment variables file

This file is called .env and should be in the same parent folder as your index.js file
```
discord-bot/
├── commands/
├── events/
├── modules/
├── node_modules
├── .env
├── config.js
├── index.js
├── package-lock.json
└── package.json
```

> ⚠ **Warning:** The .env file must never be shared with anyone or uploaded to your public repository. You should use a .gitignore file to avoid accidentally uploading the file to GitHub!
```env
DISCORD_TOKEN="your bot token here"
OWNER_ID="Your Discord User Id"
CLIENT_ID="You bot client Id"
DEVELOPMENT_GUILD_ID="optional: Your development guild Id for testing slash commands"
```
You can find your bot Client Id: ([Discord Developer Portal](https://discord.com/developers/applications) > "General Information" > application id)

You can access these variables using `process.env.YOUR_VARIABLE_NAME`.

> `process.env.DISCORD_TOKEN`


## Starting up the bot:
Use one of the following commands in your terminal to start the bot:

* `npm start` or `Node index.js`
* `pm2 start index.js`

*Recommended to use pm2 start if you want the bot to run 24/7, and restart if it crashes or encounters a bug. Also able to restarts upon using the restart command*

## Creating Commands 

> ⚠ **NOTE:**  The following setup is based on the discord-features-handler package. We are using this package to handle our discord events, setting up commands and slash commands, as well as our modules files. You can read more about the package in the DiscordFeaturesHandler Documentation.

Command files must contain the following properties:

- `name`: name of the command.
- `description`: description of the command.
- `aliases`: command aliases. If none, define it as `aliases: []`.
- *(OPTIONAL)* `guildOnly`: set to true if it's a guild-only command.
- `permission`: the defined permission level to use the command. Check `config.js` for more details.
- `minArgs`: defines the minimum number of arguments required for the command. If no args, use `minArgs: 0`.
- *(OPTIONAL)* `maxArgs`: define the maximum number of arguments required. Leave blank for unlimited arguments or for a sentence-length answer.
- `usage`: define what the arguments should be, if any. If none, use `usage: ''`.
- `execute`: the functionality and response of the command call.
### Example:
```JavaScript
module.exports = {
	name: 'ping',
	description: 'Ping Pong Command!',
	aliases: ['p'],
	guildOnly: true,
	permissions: 0,
	minArgs: 0, 
	usage: '',
	execute(message, args, client) {
		return message.channel.send('Pong.');
	},
};
```

## Creating Slash Commands
You can create slash commands by using discord.js SlashCommandBuilder.
### Objects:
```javascript
const { SlashCommandBuilder } = require("discord.js");

data: new SlashCommandBuilder().setName("").setDescription("),
async interactionReply(interaction) {},
```
### Example:
```javascript
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	name: 'ping',
	description: 'Ping Pong Command!',
	aliases: ['p'],
	guildOnly: true,
	permissions: 0,
	minArgs: 0, 
	usage: '',
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Ping Pong Command"),
	execute(message, args, client) {
		return message.channel.send('Pong.');
	},
	async interactionReply(interaction) {
		await interaction.reply({
			content: 'Pong!'
		});
	}
};
```

You can learn more by reading the [Discord Dev Docs](https://discord.com/developers/docs/interactions/slash-commands) about Slash Commands.

## Deleting Slash Commands
In your config file you can enter the slash command Id you want to delete into the `toDeleteSlashCommand` property. If you want to delete all type in the boolean: `true`. You **MUST** delete this property after the your restarting of your bot otherwise it will delete the command(s) again upon restarting your bot.

### Example:
```javascript
//config.js
{
	toDeleteSlashCommand: "123456789" // "all"
}
```


## Creating Discord Events
- name - name of the discord event; if this is not defined the discord-features-handler will use the file name as the discord event
- once - should this discord event run once on first trigger or always run when triggered.
- execute - the functionality and response of the discord event when triggered.

Example:
```javascript
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
      console.log('Bot just started!');
  },
};
```

## Bugs / Support / Suggestions

If you encounter a problem with the bot, please file an issue.

When reporting an issue, please include the following details:
- Steps to reproduce the issue
- Expected behavior
- Actual (unexpected) behavior
- Any relevant screenshots or logs

Your detailed report will help us resolve the issue as quickly as possible.

Feel free to submit a pull request if you have any suggestions or improvements.

[Report an Issue](https://github.com/bng94/heroku-bot/issues/new)

