import Discord, { Channel, DMChannel, Guild, GuildMember, Message, NewsChannel, TextChannel, Permissions, User, ReactionEmoji, MessageReaction } from "discord.js";
const client : any = new Discord.Client()
//const userResponse = require('./common/user-response.js');
const {userResponse} = require("./common/user-response.ts");
require('dotenv').config()
import * as init from "./firebase/init_fb_db"
import * as db from "./firebase/fb-db";
import * as ta from "./message-response/ta-channel";
import * as student from "./message-response/student-channel";

// Boolean condition for open or closed office hours
let q: Boolean = true;

// Initializes connection to database
const firestore = init.init_db();

// Channel ID for student and TA specific channel
const taChannelID = '951941492887392336';
const studentChannelID = '924019819286790178';

// TA role ID
const taID = '951950300816740364'

// Initializes discord bot and returns the user tag
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// Handles channel inputs
client.on("message", async (msg : Message) => {
if(msg.author.bot) {
  return;
}
if(msg.channel.id == taChannelID) {
  q = await ta.message_response(firestore, msg, q);
}
else if(msg.channel.id == studentChannelID) {
  if(q) {
    await student.message_response(firestore, msg);
  }
  else {
    msg.author.send("The help queue is currently closed, please wait for it to reopen");
    msg.delete();
  }
}
/*
const g: Guild | null = msg.guild;
  if(g instanceof Guild) {
      const author : GuildMember = await g.members.fetch({user : msg.author});
      const p : typeof userResponse = new userResponse(false);
      const channel: TextChannel | DMChannel | NewsChannel = msg.channel;
      const access : boolean = true;
      p.permissions = [{author, channel, access}];
      p.send_message(msg);
      console.log(author.permissions.has(Permissions.FLAGS.SEND_MESSAGES));
  } */
  //msg.channel.updateOverwrite(client, {SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true});
})

// Reaction management
client.on("raw", async(packet: any) => {
  if (!['MESSAGE_REACTION_ADD'].includes(packet.t)) return;
  if(packet.d.channel_id === studentChannelID) {
    student.reaction_response(firestore, packet);
  }
})

/*
client.on("messageReactionAdd", async(react: any, user: User) => {
  console.log(react.users.cache.id);
  
  if(react.message.member.roles.find((r: any | {name: string; }) => r.name == "TA")) {
    react.message.reply("TA has reacted to message");
    console.log("this is happening");
  }
  else {
    react.remove();
  } 
  
})
*/

client.login(process.env.TOKEN)


