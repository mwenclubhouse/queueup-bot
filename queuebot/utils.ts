import Discord, { 
    Channel, DMChannel, Guild, GuildMember, Message, 
    NewsChannel, TextChannel, Permissions, 
    User, ReactionEmoji, MessageReaction, Client
} from "discord.js";

export async function getMessage(client: Client, packet: any): Promise<{channel: TextChannel | undefined, msg: Message | undefined}> {
    const channel: Channel = await client.channels.fetch(packet.d.channel_id);
    if (channel instanceof TextChannel) {
      const msg = await channel.messages.fetch(packet.d.id);
      return {channel, msg};
    }
    return {channel: undefined, msg: undefined};
}