# Heroku Discord Bot
### TypeScript Edition!
A Discord.js demo bot for my npm package called Discord-Features-Handler.


## Description
This is a generic bot for everyone to download and use. Since the creation of my DiscordFeaturesHandler npm package, I am converting this to be more geared towards a demo bot for those interested in a basic Discord.js bot setup with the package. Originally, it was a bot hosted on Heroku but has been converted into a demo bot.

(Note: Heroku is stopping all free services starting Nov 28, 2022, and requires paid plans to continue services)

## Installation

If you clone or fork my repository, make sure to run:

```bash
 npm install
```

## TypeScript Folder Structure
you will need to create a src folder and bot related files
```
discord-bot/
├── node_modules/
├── src/
│   ├── commands/
│   ├── events/
│   ├── modules/
│   ├── types/
│   │    └── index.d.ts
│   ├── config.ts
│   └── index.ts
├── .env
├── package-lock.json
├── package.json
└── tsconfig.json


## Create your Environment variables file

This file is called .env and should be in the same parent folder as your index.ts file
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

## tsconfig.json file:
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "typeRoots": ["./src/types"],
    "removeComments": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "strictNullChecks": true,
    "skipLibCheck": true
  }
}
```

## Starting up the bot:

* Run the following command first before starting the bot
in development mode:
```bash
npm run dev
```
in prod:
```bash
 npm run build
```
then
```bash
npm run start
```
or 
**if you choose to use pm2**
```bash
npm run prod 
```

*During development, any file changes then the bot will automatically restart*

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
```TypeScript
import { Client, Message } from "discord.js";

module.exports = {
	name: 'ping',
	description: 'Ping Pong Command!',
	aliases: ['p'],
	guildOnly: true,
	permissions: 0,
	minArgs: 0, 
	usage: '',
	execute(message: Message, args: string[], client: Client) {
		return message.channel.send('Pong.');
	},
};
```

## Creating Slash Commands
You can create slash commands by using discord.js SlashCommandBuilder.
### Objects:
```TypeScript
import { SlashCommandBuilder } from "discord.js";


data: new SlashCommandBuilder().setName("").setDescription("),
async interactionReply(interaction) {},
```
### Example:
```javascript
import { Client, Interaction, Message, SlashCommandBuilder } from "discord.js";


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
  execute(message: Message, args: string[], client: Client) {
		return message.channel.send('Pong.');
	},
	async interactionReply(interaction: Interaction) {
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
```TypeScript
//config.ts
{
	toDeleteSlashCommand: "123456789" 
}
```


## Creating Discord Events
- name - name of the discord event; if this is not defined the discord-features-handler will use the file name as the discord event
- once - should this discord event run once on first trigger or always run when triggered.
- execute - the functionality and response of the discord event when triggered.

Example:
```TypeScript
import { Client, Events } from "discord.js";

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
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

