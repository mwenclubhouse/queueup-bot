import Discord, { Channel, DMChannel, Guild, GuildMember, Message, NewsChannel, TextChannel, Permissions, User } from "discord.js";
import * as init from "../firebase/init_fb_db"
import * as db from "../firebase/fb-db";
import { channel } from "diagnostics_channel";

export async function response(firestore: FirebaseFirestore.Firestore, msg: Message) {
    if(msg.content == '!next') {
        let str = await db.getNext(firestore);
        msg.reply(String(str));
    }
    else if(msg.content == "!help") {
        await help(msg);
    }
}

// Prints out list of help commands for channel
async function help(msg: Message) {
    let header = "List of TA-Channel Queueup-Bot commands:"

    // Enter commands in [command, description] format
    var commands = [
        ['!next', 'Queueup-bot returns the name of the next student in the queue.'],
        ['!help', 'Queueup-bot will print out the list of commands.']
    ]
    for(let i = 0; i < commands.length; i++) {
        header += '\n   ' + commands[i][0] + ":     " + commands[i][1];
    }
    msg.channel.send(header);
}