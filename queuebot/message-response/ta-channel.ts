import Discord, { Channel, DMChannel, Guild, GuildMember, Message, NewsChannel, TextChannel, Permissions, User } from "discord.js";
import * as init from "../firebase/init_fb_db"
import * as db from "../firebase/fb-db";
import { channel } from "diagnostics_channel";
import { FIREBASE_CONFIG_VAR } from "firebase-admin/lib/app/lifecycle";
const studentChannelID = '924019819286790178';

export async function message_response(firestore: FirebaseFirestore.Firestore, msg: Message) {
    if(msg.content == '!next') {
        let str = await db.getNext(firestore);
        msg.reply(String(str));
    }
    else if(msg.content == "!help") {
        await help(msg);
    }
    if(msg.content == "!CLEAR QUEUE") {
        await db.clearQueue(firestore);
        if(msg.guild != null) {
            let channel = msg.guild.channels.cache.get(studentChannelID);
            let temp;
            let fetched;
            if(channel != null && channel instanceof TextChannel) {
                do {
                    fetched = await channel.messages.fetch({limit: 1});
                    temp = await channel.bulkDelete(fetched).catch(console.error);
                } while(fetched.size>= 1)
            }
        }
    }
}

export async function reaction_response(firestore: FirebaseFirestore.Firestore, packet: any) {
    
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