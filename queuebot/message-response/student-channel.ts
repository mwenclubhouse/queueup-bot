import Discord, { Channel, DMChannel, Guild, GuildMember, Message, NewsChannel, TextChannel, Permissions, User } from "discord.js";
import * as init from "../firebase/init_fb_db"
import * as db from "../firebase/fb-db";

export async function response(firestore: FirebaseFirestore.Firestore, msg: Message) {
    if(msg.content == "I need help") {
        db.addMem(firestore, String(msg.author.username));
        msg.react("✋");
        msg.reply("You have been added to the queue");
    }
    else if(msg.content == "!help") {
        await help(msg);
    }
    else {
        msg.reply("Please only use this channel for queueing");
    }
}

// Prints out list of help commands for channel
async function help(msg: Message) {
    let header = "List of Student-Channel Queueup-Bot commands:"

    // Enter commands in [command, description] format
    var commands = [
        ["I need help", "Will enter you into queue."],
        ['!help', 'Queueup-bot will print out the list of commands.']
    ]
    for(let i = 0; i < commands.length; i++) {
        header += '\n   ' + commands[i][0] + ":     " + commands[i][1];
    }
    msg.channel.send(header);
}