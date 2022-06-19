# Heroku Discord Bot
A discord.js backup bot of my backup bot. Originally was planning to create one bot but ended up creating another bot then this one. This bot is hosted on heroku for free and as such will run 24/7 for 23 days a month.

# Description
This is primarily a backup bot of a bot called "Doctor" on my server and will be planning to make this bot called "Master" in references to the BBC TV Show Doctor Who. This is a generic bot for everyone to download and use. As this is one of my first early JavaScript Projects I though it would be nice to share for those interested in creating their own discord.js bots. If there is an handful of people whom fork or give an input to this project, will expand and present more generic features that aren't used in this backup bot that may or is being used in my other bots.

# Configuration

You need to install the following packages:
* npm install discord.js
* npm install discord-features-handler
* npm install module-alias
* npm install dotenv
* npm install moment
* npm install moment-duration-format
* npm install ms

or if you forked the repository then just run:
* npm install

#  Create an `.env` file for your Environment variables

> ⚠ **Warning:** This `.env` file is a file that you MUST never be shared with anyone and never be uploaded to  your public repository and/or you should use a .gitignore file so you don't accident upload the file to github! 
* TOKEN = your bot token
* ownerID = your own discord user ID
* serverLink = your own discord server invite link
* serverID = your own discord server invite link

you can access these variables by using `process.env.YOUR_VARIABLE_NAME`

> Example: `process.env.TOKEN`
# Starting up the bot

You can run the bot using command line with one of the two commands listed:
* `Node index.js`
  * You can also type `npm start` to run this `node index.js`
* `pm2 start index.js`

*Recommended to use pm2 start if you want the bot to run 24/7, and restart if it crashes or encounters a bug. Also able to restarts upon using the restart command*

# Setup
#### The following setup are based on Discord-Features-Handler package. We are using this package to handle our discord events, setting up command and slash commands as well as our modules files. You can read more about the package in the [DiscordFeaturesHandler Documentation](https://bng94.gitbook.io/discord-features-handler-docs/).

## Creating Commands 
Command files must contain the following properties:
* name - name of the command.
* description - description of the command
* aliases - for command aliases, If none define it as:  `aliases: []`,
* (OPTIONAL) guildOnly - set true if its an guild only command.
* permission - the defined permission level to use the command.
  - check `config.js` file for more details 
* minArgs - defines the minimum number of arguments required for the command. 
  - If no args: `minArgs: 0` 
* (OPTIONAL) maxArgs - define the maximum number of arguments required.
  - leave blank if unlimited arguments or is a sentence length answer
* usage - define what the arguments should be if any. If none define it as: `usage: ''`
* execute - the functionality and response of the command call.
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
You can create slash commands by adding these objects to your the command file that you want to change into a slash command.
### Objects:
```javascript
slash: true,
async interactionReply(interaction) {},
```
### Example:
```javascript
module.exports = {
	name: 'ping',
	description: 'Ping Pong Command!',
	aliases: ['p'],
	guildOnly: true,
	permissions: 0,
	minArgs: 0, 
	usage: '',
	slash: true,
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

If you want to use slash command options then add this into your command file:
`slashOptions: `

### Example:
> If the slash command requires you to mention someone then set this option
```javascript
slash: true,
slashOptions: [{ 
    name: 'someone', 
    description: 'Mention Someone', 
    required: true, 
    type: 6 
}],
async interactionReply(interaction) {
	const { options } = interaction;
    const user = await options.getUser('someone');
	await interaction.reply({
		content: `Hello ${user.username}!`
	});
}
```

You can learn more by reading the [Discord Dev Docs](https://discord.com/developers/docs/interactions/slash-commands) about Slash Commands.

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

If you find a problem with the bot, please file an issue.

Please also state how the issue can be reproduced and the expected and unexpected behavior of the bot. If any screenshots please feel free to show it, so the issue can be solved as quickly as possible.

You are welcome to PR if you see any changes that should be made.

[Report an Issue](https://github.com/bng94/heroku-bot/issues/new)