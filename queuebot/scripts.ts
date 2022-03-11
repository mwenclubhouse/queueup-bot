import Discord, { Channel, DMChannel, Guild, GuildMember, Message, NewsChannel, TextChannel, Permissions } from "discord.js";
const client : any = new Discord.Client()
//const userResponse = require('./common/user-response.js');
const {userResponse} = require("./common/user-response.ts");
require('dotenv').config()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", async (msg : Message) => {
  
    
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

    
    //const p : typeof userResponse = new userResponse(false);
    /*
    p.emoji = ["✋", "✅", "⌛", "🔄", "❌"];
    p.response = ["This is a test response", "All responses are sending", "Nice"];
    p.send_message(msg);
    */

  })

client.login(process.env.TOKEN)
