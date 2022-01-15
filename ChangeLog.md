# ChangeLog
All notable changes to this project will be documented below.
### [3.2.0] - 2022-01-09
* Removed MongoDB connection and related files.
* MongoDB does not work with Heroku unless you have an IP address heroku provided.
### [3.1.0] - 2022-01-09
* Updated missing changes for v13
* Updated all embeds for v13
* Updated to DiscordJS v13.5.1
* Added more details creating slash commands in slashCmds.js file
* Recreated the help.js command file, it has the button interaction components for displaying all of the bot commands without being a slash command.
### [3.0.0] - 2021-05-19
* Updated to DiscordJS v13.3.1
* Implemented new way to declare client
* Re-did registering slash commands and their replies for v13 format
* Updated mmessage event to messageCreate event.
* Updated hugs and ping cmd for new slash cmd method.
* Turned neko cmd into slash cmd for epherual example.
### [2.2.0] - 2021-05-19
* Created handlers folder for loading commands, events and modules.
* Added `@handlers`, module-alias for handlers folder to package.json.
* Moved daily() from main file and created a file for the function in modules.
* Updated restartMsg file to run loadMsg upon loading the file itself as the msg is required until start of the bot.

### [2.1.0] - 2021-04-30
* Added mongo.js file for mongoDB usage. 
* Update how bot started and restart message work.
* Added schema folder for mongoose schemas.

### [2.0.0] - 2021-04-19
* Removed `enmap` and `enmap level` npm packages
* Installed `dotenv` package to make transitions to online hosting service easier.
* Installed `module-alias` for absolute path among files.
* Reformatted all commands and events into more modern format for discordJS bot development style.
* Ability to create event files without using those event name as file name.
* Implemented sub-directories for command folder and used the define sub-directory names as the command category names for the files in their respective directory.
* Implemented the unofficial setup of DiscordJS slash commands.
