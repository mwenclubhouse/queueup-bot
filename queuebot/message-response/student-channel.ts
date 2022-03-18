import Discord, { Channel, DMChannel, Guild, GuildMember, Message, NewsChannel, TextChannel, Permissions, User } from "discord.js";
import * as init from "../firebase/init_fb_db"
import * as db from "../firebase/fb-db";

export async function response(firestore: FirebaseFirestore.Firestore, msg: Message) {
    if(msg.content == "I need help") {
        db.addMem(firestore, String(msg.author.username));
        msg.reply("You have been added to the queue");
    }
    else {
        msg.reply("Please only use this channel for queueing");
    }
}