require('dotenv').config();

import { CategoryChannel, ChannelType, Guild, TextChannel } from 'discord.js';
import { Commands } from './Commands';
import { ToDoClient } from './types/ToDoClient';



export async function Ready(client: ToDoClient): Promise<void> {
    if (!client.user || !client.application) {
        return;
    }

    await client.application.commands.set(Commands);

    console.log(`ready ${client.user.tag}`);

    /*

    TODO:
    Creates a ToDoBot channel category and a Taskboard text channel in it. Discuss. 

    let server: Guild = await client.guilds.fetch(process.env.guildId);

    let category: CategoryChannel = await server.channels.create({
        name: "ToDoBot",
        type: ChannelType.GuildCategory
    });

    await server.channels.create({
        name: "Taskboard",
        type: ChannelType.GuildText,
        parent: category.id
    });
    
    */
}