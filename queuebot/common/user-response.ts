import discord, { Snowflake, Message, Channel, Permissions, TeamMember, User, TextChannel, GuildMember, NewsChannel, DMChannel, MessageEmbed } from "discord.js";
import NONAME from "dns";

async function clear_emojis(message : any) {
    var reaction : any;
    for (reaction in message.reactions) {
        await reaction.clear();
    }
}

export class userResponse {
    response: (MessageEmbed | string)[];
    done: boolean;
    emoji: string[];
    delete_message: boolean;
    /* List: List of tuples
    1. Author: 
    2. Channel: 
    3. Access: 
    */
    permissions: {author: GuildMember | null, channel: TextChannel, access: boolean}[];
    loading: boolean;
    constructor(done = true) {
        this.response = [];
        this.done = done;
        this.emoji = [];
        this.delete_message = false;

        // (Channel, Author, Access)
        this.permissions = [];
        this.loading = false;
    }

    response_tail() {
        if (this.response.length == 0) {
            return null;
        }
        return this.response.at(-1);
    }

    set_options(state = null) {
        var waiting_emoji = ["✋"];
        var done_emoji = ["✅"];
        var helping_emoji = ["✅", "⌛"];
        var history_emoji = ["🔄"];
        var failure_emoji = ["❌"];
        if (!this.done) {
            if (state === "helping") {
                this.emoji = helping_emoji;
            }
            else if (state == "history") {
                this.emoji = history_emoji;
            }
            else if (state == "done") {
                this.emoji = done_emoji;
            }
            else if (state == "failure") {
                this.emoji = failure_emoji;
            }
            else {
                this.emoji = waiting_emoji;
            }
        }
    }

    add_response(item : string, done = false) {
        if (!this.done) {
            this.done = this.done || done;
            if ((item != null) && (item != this.response_tail())) {
                this.response.push(item);
            }
        }
    }

    /*
    async send_loading(message) {
        if (this.loading) {
            response = discord.MessageEmbed().add_field({name: "Loading", value: "Loading Content"});
            await message.channel.send(embed=response);
        }
    }
    */

    async send_message(message : Message, channel? : TextChannel | NewsChannel | DMChannel) {
        if (channel == undefined) {
            channel = message.channel;
        }
        for (const element of this.permissions) {
            console.log(this.permissions);
            if (element.author instanceof GuildMember && !(channel instanceof DMChannel)) {
                await channel.updateOverwrite(element.author, {SEND_MESSAGES: element.access, READ_MESSAGE_HISTORY: element.access});
                channel.send("${element.author} has had permissions changed!");
                //await channel.permissionsOverwrites(element.at(0), read_messages=element.at(2), send_messages=element.at(2));
            }
        }
        if (message != null) {
            for (const element of this.emoji) {
                await message.react(element);
            }
        }
        if(channel == undefined) {
            channel = message.channel;
        }
        for (const element of this.response) {
            await channel.send(element);
        }
    }
}

