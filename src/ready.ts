import { TextChannel } from 'discord.js';
import { Commands } from './Commands';
import { ToDoClient } from './types/ToDoClient';


export async function Ready(client: ToDoClient): Promise<void> {
    if (!client.user || !client.application) {
        return;
    }

    await client.application.commands.set(Commands);

    console.log(`ready ${client.user.tag}`);

    // find text-channel / create it

    let botSpam: TextChannel = null;

    try {
        // fetch taskboard (bot spam)
        botSpam = await client.channels.fetch("1096933563972210841") as TextChannel;
    } catch (error) {
        console.error(error);
    }

    if (botSpam != null) {
    }
}