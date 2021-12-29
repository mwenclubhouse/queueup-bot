const Discord = require("discord.js");
const { NONAME } = require("dns");

async function clear_emojis(message) {
    for (reaction in message.reactions) {
        await reaction.clear();
    }
}

class userResponse {
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

    add_response(item, done = false) {
        if (!this.done) {
            this.done = this.done || done;
            if ((item != null) && (item != this.response_tail())) {
                this.response.push(item);
            }
        }
    }

    async send_loading(message) {
        if (this.loading) {
            response = discord.Embed().add_field(name="Loading", value="Loading Content");
            await message.channel.send(embed=response);
        }
    }

    
    async send_message(message, channel = null) {
        if (channel == null) {
            channel = message.channel;
        }
        for (const element of self.permissions) {
            await channel.set_permissions(element.at(0), read_messages=element.at(2), send_messages=element.at(2));
        }
        if (message != null) {
            for (const element of self.emoji) {
                await message.add_reaction(element);
            }
        }
        for (const element of response) {
            if (typeof(element) == "string") {
                await channel.send(element);
            }
            else {
                await channel.send(embed = element);
            }
        }
    }
}