import Discord, { 
  Channel, DMChannel, Guild, GuildMember, Message, 
  NewsChannel, TextChannel, Permissions, 
  User, ReactionEmoji, MessageReaction, Client
} from "discord.js";
import { config } from "dotenv";
import * as init from "./queuebot/firebase/init_fb_db"
import * as db from "./queuebot/firebase/fb-db";
import * as ta from "./queuebot/message-response/ta-channel";
import * as student from "./queuebot/message-response/student-channel";
import express from "express";
import { getMessage } from "./queuebot/utils";

const client: Client = new Discord.Client();
config();

// Boolean condition for open or closed office hours
let q: Boolean = true;

// Initializes connection to database
const firestore = init.init_db();

// Channel ID for student and TA specific channel
const taChannelID: string = '951941492887392336';
const studentChannelID: string = '924019819286790178';

// TA role ID
const taID: string = '951950300816740364'

// Initializes discord bot and returns the user tag
client.on("ready", () => {
  const temp: any = null;
  const value = temp?.value || 5;
  console.log(`Logged in as ${client.user?.tag || null}!`)
})

// Reaction management
client.on("raw", async (packet: any) => {
  if (packet.t === null || packet.d == null) {
    return;
  }
  if (packet?.d?.author?.bot) {
    return;
  }
  if (packet.t === 'MESSAGE_CREATE') {
    const {channel, msg} = await getMessage(client, packet);
    if ((!channel) || (!msg)) {
      return;
    }
    if (packet.d.channel_id == taChannelID) {
      q = await ta.message_response(firestore, msg, q);
    }
    else if (packet.d.channel_id == studentChannelID) {
      if (q) {
        await student.message_response(firestore, msg);
      }
      else {
        msg.author.send("The help queue is currently closed, please wait for it to reopen");
        msg.delete();
      }
  }

  }
  if (packet.t === 'MESSAGE_REACTION_ADD') {
    if (!['MESSAGE_REACTION_ADD'].includes(packet.t)) return;
    if (packet.d.channel_id === studentChannelID) {
      student.reaction_response(firestore, packet);
    }
  }
})

const app = express();
app.use(express.json());

app.get('/', (req : any, res : any) => {
    res.send('Hello World!')
})

client.login(process.env.TOKEN)
app.listen(3000, function () {
    console.log('Server is running: 3000');
});
