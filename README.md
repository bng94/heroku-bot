# Heroku Discord Bot
A discord.js backup bot of my backup bot. Originally was planning to create one bot but ended up creating another bot then this one. This bot is hosted on heroku for free and as such will run 24/7 for 23 days a month.

# Description
This is primarily a backup bot of a bot called "Doctor" on my server and will be planning to make this bot called "Master" in references to the BBC TV Show Doctor Who. This is a generic bot for everyone to download and use. This bot is flexible to be used amd hosted on heroku server or other free hosting services. Since the creation of my DiscordFeaturesHandler npm package, I am converting this more geared as a demo bot for those interested in looking at a basic Discord.js bot setup with the package. Please give this repository or DiscordFeaturesHandler repository a star if you like what you see and want to see the more of these type of projects!

# Installation

If you clone or forked my repository make sure to run:

```javascript
 npm install
```
## Create your Environment variables file

This file is called .env and should be in the same parent folder as your index.js file

> ⚠ **Warning:** This `.env` file is a file that you MUST never be shared with anyone and never be uploaded to  your public repository and/or you should use a .gitignore file so you don't accident upload the file to github! 
* TOKEN = your bot token
* ownerID = your own discord user ID
* serverLink = your own discord server invite link
* serverID = your own discord server invite link

you can access these variables by using `process.env.YOUR_VARIABLE_NAME`

> Example: `process.env.TOKEN`


## Starting up the bot:
Use one of the following command in your terminal to start the bot:

* `npm start` or `Node index.js`
* `pm2 start index.js`

*Recommended to use pm2 start if you want the bot to run 24/7, and restart if it crashes or encounters a bug. Also able to restarts upon using the restart command*

## Creating Commands 

> ⚠ **NOTE:**  The following setup are based on discord-features-handler package. We are using this package to handle our discord events, setting up command and slash commands as well as our modules files. You can read more about the package in the DiscordFeaturesHandler Documentation.

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
You can create slash commands by adding these properties to your the command file that you want to change into a slash command.
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
> If the slash command requires you to mention someone then set this property:
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

