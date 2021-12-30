import Discord from "discord.js";
const client = new Discord.Client()
//const userResponse = require('./common/user-response.js');
//const {userResponse} = require("./common/user-response.js");
//require('dotenv').config()
import {} from 'dotenv/config'

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


import { userResponse } from "./common/user-response.js";
const p = new userResponse();