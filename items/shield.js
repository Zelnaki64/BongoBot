const Discord = require('discord.js');
const embeds = require('../functions/embeds')
const functions = require('../functions/functions')
const db = require("../db")

module.exports = {
    name: 'shield',
    displayName: "Shield",
    aliases: ['shields', 'shieldes'],
    inshop: true,
    emoji: ':shield:',
    price: 12000,
    description: "Protect yourself from any robbers!",

    async execute(message, args, result) {
        var result = await db.fetch(message.author.id)
        if (result.items.shield < 1) return message.channel.send("You don't have any shields...")
        result.items.shield = result.items.shield - 1
        console.log(args[0].toLowerCase())
        if ((result.rob.invincibleStart + result.rob.invinciblityTime) > Date.now() && args[1].toLowerCase() !== "f") {
            var time = functions.msToString((result.rob.invincibleStart + result.rob.invinciblityTime - Date.now()))
            var sendMessage = "`a.use shield f`"
            return message.channel.send(`You are already safe for **${time}**.\nBut you can do ${sendMessage} to use your shield!`)
        }


        result.rob.invinciblityTime = 43200 * 1000

        result.rob.invincibleStart = Date.now()
        await db.set(message.author.id, "items", result.items)

        await db.set(message.author.id, "rob", result.rob)
        return embeds.successEmbed(message, "Shield was used, you are now safe for **12 hours**!")

    }
}