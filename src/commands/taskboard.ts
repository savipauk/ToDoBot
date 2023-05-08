require('dotenv').config();

import { AnyThreadChannel, ApplicationCommandOptionType, ApplicationCommandType, Channel, ChannelType, CommandInteraction, Guild, TextChannel } from 'discord.js';
import { GetTasks, SetThreadId, Task, TasksToString } from '../tasks';
import { Command } from '../types/Command';
import { ToDoClient } from '../types/ToDoClient';

export const Taskboard: Command = {
    name: "taskboard",
    description: "Set taskboard channel",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "channel",
            description: "The channel you want to set as the taskboard channel",
            required: true,
            type: ApplicationCommandOptionType.Channel
        }
    ],
    run: async (interaction: CommandInteraction, client: ToDoClient) => {
        let channelID = interaction.options.get('channel').value.toString();

        let channel: Channel = await client.channels.fetch(channelID);

        let content = "";

        if (channel.type == ChannelType.GuildText) {
            client.taskboardID = channelID;
            content = "okey taskboard is now channel with id: `" + channelID + "` aka " + channel.toString();

            channel.send(`## This is the taskboard\n\n${TasksToString()}`);

            for (let task of GetTasks()) {
                let threadId = await CreateThreadForTask(task, client);
                SetThreadId(task.id, threadId);
            }
        } else {
            content = "bro this is not text channel, id `" + channelID + "` type: `" + channel.type + "` (https://discord.com/developers/docs/resources/channel) aka " + channel.toString();
        }


        await interaction.followUp({
            ephemeral: false,
            content
        })
    }
}

export async function CreateThreadForTask(task: Task, client: ToDoClient): Promise<string> {
    let channel: TextChannel = await GetTaskboardTextChannel(client);

    let taskThread = await channel.threads.create({
        name: `${task.id} | ${task.description} | <@${task.assignee}>`,
        type: ChannelType.PublicThread,
    })

    taskThread.send(`${task.description}, for <@${task.assignee}> | ${task.id}`);

    return taskThread.id;
}

export async function CloseThreadForTask(task: Task, client: ToDoClient): Promise<AnyThreadChannel<boolean>> {
    let channel: TextChannel = await GetTaskboardTextChannel(client);

    let thread = await channel.threads.fetch(task.threadId);
    await thread.send("Task remove. Closing thread.");

    return await thread.setArchived();
}

async function GetTaskboardTextChannel(client: ToDoClient): Promise<TextChannel> {
    return await client.channels.fetch(client.taskboardID) as TextChannel;
}

export async function SendMessageToThread(task: Task, client: ToDoClient): Promise<string> {
    // TODO

    return ""
}