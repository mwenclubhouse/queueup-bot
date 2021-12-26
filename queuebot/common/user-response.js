const Discord = require("discord.js")

function clear_emojis(message) {
    for (reaction in message.reactions) {
        await reaction.clear();
    }
}