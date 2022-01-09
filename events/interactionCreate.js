/**
 * This file register/create our slash commands reply
 */

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        const { commandName } = interaction;
        const cmd = client.commands.get(commandName);

        /**
         * * This logs whoever uses the slash commands and also gives us the ID.
         * * We can use this ID to delete the slash commands when we see fit.
         */
        client.log(`${commandName}`, `${interaction.user.tag}`, `SLASH CMD`);
        client.log(commandId, 'ID', 'SLASH CMD');

        /** 
         * We register our slash cmd replies with a small code
         * in our slash cmd files we create an async interactionReply()
         * This way the name interactionReply reflect the actual method
         * Also creates our code reusable and leave the functionality in the cmd files as it should be.
        */
        cmd.interactionReply(interaction, client);
        // !passing client is optionial, but useful if you are using client in your slash cmds.!
    },
};