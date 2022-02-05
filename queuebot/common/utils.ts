import { strictEqual } from "assert";
import Discord, {Channel, CategoryChannel, MessageEmbed} from "discord.js";

function list_categories(channels: Channel[]) {
    var categories : CategoryChannel[] = [];
    categories.forEach(element => {
        if(element instanceof CategoryChannel && element.name != "Personal") {
            categories.push(element);
        }
    });
    return categories;
}

function create_simple_message(name: string, value: string, messageEmbed: MessageEmbed | null = null ) {
    if(messageEmbed !instanceof MessageEmbed) {
        messageEmbed = new Discord.MessageEmbed();
    }
    return messageEmbed?.addField(name = name, value = value);
}

function iterate_commands(content: string, commands: any[], starts_with: Boolean = true) {
    commands.forEach(element => {
        let v = element.at(0);
        let t = element.at(1);
        if((starts_with && content.startsWith(v)) || (!starts_with && content == v)) {
            return t
        }
    });
    return null;
}