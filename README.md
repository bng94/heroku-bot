# Heroku Discord Bot
A discord js backup bot of my backup bot. Originally was planning to create one bot but ended up creating another bot then this one. This bot is hosted on heroku for free and as such will run 24/7 for 23 days a month.


## Description
An discord bot that is hosted on heroku. This primarily a backup bot of a bot called "Doctor" on my server and will be planning to make this bot called "Master" in references to the BBC TV Show Doctor Who. This is a generic bot for everyone to download and use. If there is an handful of people whom fork or give an input to this project, will expand and present more generic features that aren't listed in this backup bot.

## Usage

You can run the bot using command line with one of the two commands listed:
* `Node index.js`
* `pm2 start index.js`

*Recommended to use pm2 start if you want the bot to run 24/7, and restart if it crashes or encounters a bug. Also able to restarts upon using the restart command*

Environment variables in your `.env` file :
* process.env.TOKEN = your bot token
* process.env.ownerID = your own discord user ID
* process.env.serverLink = your own discord server invite link
* process.env.serverID = your own discord server invite link
* process.env.botID = your bot ID => used for slash cmds, you MUST define this as a string of your bot id or else slash cmds won't work.

## Creating Commands
Every command contains the following:
* name - name of the command.
* description - description of the command.
* permission - the defined permission level to use the command.
  * check `config.js` file for more details 
* minArgs - defines the minimum number of arguments required for the command. 
  * If no args: `minArgs: 0` 
* (OPTIONAL) maxArgs - define the maximum number of arguments required.
  * leave blank if unlimited
* aliases - for command aliases, If none define it as:  `aliases: []`,
* (OPTIONAL) guildOnly - set true if its an guild only command.
* usage - define what the arguments should be if any. If none define it as: `usage: ''`
* execute - the functionality of the command.
* interactionReply - if slash cmds, this is the reply of the slash cmds.
#### Example:
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
You can create slash commands by adding `slash: true` into your cmd file.

#### Example:
```javascript
name: 'ping',
description: 'Ping Pong Command!',
slash: true,
async interactionReply(interaction) {
	await interaction.reply({
		content: 'Pong!'
	});
}
```

If you want to use slash command options then add this into your command file:
`slashOptions: `

#### Example:
If you want have a required option where you must mention someone then you set, slashOptions
```javascript
slashOptions: [{ 
    name: 'someone', 
    description: 'Mention Someone', 
    required: true, 
    type: 6 
}],
```

You can read [Discord Dev Docs](https://discord.com/developers/docs/interactions/slash-commands) about Slash Commands and for slash options, refer to [#applicationcommandoption](https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption) section.

## Bugs / Support / Suggestions

If you find a problem with the bot, please file an issue.

Please also state how the issue can be reproduced and the expected and unexpected behavior of the bot. If any screenshots please feel free to show it, so the issue can be solved as quickly as possible.

[Report an Issue](https://github.com/bng94/heroku-bot/issues/new)

