
const Discord = require('discord.js');
const db = require("../../db")
const embeds = require("../../functions/embeds")

module.exports = {
    name: 'enable',
    description: 'enable commands!',
    usage: '`a.enable <command>`',
    category: 'utility',

    async execute(message, args) {
        if (!args[0]) return embeds.errorEmbed(message, "Invalid arguments.")


        var command = message.client.commands.get(args[0].toLowerCase()) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase()));
        if (!command) return message.channel.send("This is not a valid command.")

        if (["enable", "disable"].includes(command.name)) return embeds.errorEmbed(message, "This command cannot be enabled!")

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('You cannot use the **enable** command.');
        }


        var result = await db.fetchguild(message.guild.id)
        if (!result.disabled[command.name]) return message.channel.send("This command is already enabled.")


        delete result.disabled[command.name]
        await db.guildset(message.guild.id, "disabled", result.disabled)

        console.log(result.disabled)
        return embeds.successEmbed(message, `${command["name"]} was enabled!`)



    },
};