import Discord, { Channel, DMChannel, Guild, GuildMember, Message, NewsChannel, TextChannel, Permissions, User, ReactionEmoji, MessageReaction } from "discord.js";
const client : any = new Discord.Client()
//const userResponse = require('./common/user-response.js');
const {userResponse} = require("./common/user-response.ts");
require('dotenv').config()
import * as init from "./firebase/init_fb_db"
import * as db from "./firebase/fb-db";
import * as ta from "./message-response/ta-channel";
import * as student from "./message-response/student-channel";

// Initializes connection to database
const firestore = init.init_db();

// Channel ID for student and TA specific channel
const taChannelID = '951941492887392336';
const studentChannelID = '924019819286790178'

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
    ta.response(firestore, msg);
  }
  else if(msg.channel.id == studentChannelID) {
    student.response(firestore, msg);
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
  
  client.on("messageReactAdd", async(react: any, user: User) => {
    console.log("This is happening rn");
    if(react.message.member.roles.find((r: any | {name: string; }) => r.name == "TA")) {
      react.message.reply("TA has reacted to message");
      console.log("this is happening");
    }
    else {
      react.remove();
    }
  })

client.login(process.env.TOKEN)
