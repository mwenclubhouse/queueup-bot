const Discord = require("discord.js")
const client = new Discord.Client({ intents: ['DIRECT_MESSAGES', 'GUILD_MESSAGES'] });

client.on("ready", () => {
    console.log('Logged in as ${client.user.tag}!')
})

client.login("OTI0MDIwNzQwNjQxMTYxMjE2.YcYfYA.LEp3eh1d81dea5ynXptM--i5otk")