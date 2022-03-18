import Discord, { DMChannel, Guild, GuildMember, Message, NewsChannel, TextChannel, User } from "discord.js";
import { userResponse } from "./common/user-response";
import * as dotenv from "dotenv";

const client : Discord.Client = new Discord.Client()
//const guild: Promise<Guild> = client.guilds.fetch("811389293510524987");
dotenv.config()

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`)
})

client.on("message", async (msg : Message) => {
  /*
  const author: User = msg.author;
  const channel: TextChannel | DMChannel | NewsChannel = msg.channel;
  const g: Guild = await guild;
  const author_member: GuildMember = await g.members.fetch({user: author});
  */

  if (msg.channel instanceof TextChannel) {
    // it is a text channel
  }
  if (msg.content === "ping") {
    msg.reply("pong");
  }
  msg.react('👍')
})

client.login(process.env.TOKEN)

