import Discord from "discord.js";
const client : any = new Discord.Client()
//const userResponse = require('./common/user-response.js');
const {userResponse} = require("./common/user-response.ts");
require('dotenv').config()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", (msg : any) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
  msg.react('👍')
})

client.login(process.env.TOKEN)

