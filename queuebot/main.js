const Discord = require("discord.js")
const client = new Discord.Client()
require('dotenv').config()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
  msg.react('👍')
  //clear_emojis(msg);
})



async function clear_emojis(message) {
    for (reaction in message.reactions) {
        await reaction.clear();
    }
}

client.login(process.env.TOKEN)