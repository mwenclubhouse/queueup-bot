import Discord, { Channel, DMChannel, Guild, GuildMember, Message, NewsChannel, TextChannel, Permissions, User } from "discord.js";
import * as init from "../firebase/init_fb_db"
import * as db from "../firebase/fb-db";

export async function response(firestore: FirebaseFirestore.Firestore, msg: Message) {
    if(msg.content == '!next') {
        let str = await db.getNext(firestore);
        msg.reply(String(str));
    }
}