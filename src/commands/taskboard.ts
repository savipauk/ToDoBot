import { ApplicationCommandOptionType, ApplicationCommandType, Channel, ChannelType, CommandInteraction } from 'discord.js';
import { TasksToString } from '../tasks';
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

        console.log(channelID);

        let channel: Channel = await client.channels.fetch(channelID);

        let content = "";

        if (channel.type == ChannelType.GuildText) {
            client.taskboardID = channelID;
            content = "okey taskboard is now channel with id: `" + channelID + "` aka " + channel.toString();

            channel.send(`## This is the taskboard\n\n${TasksToString()}`);
        } else {
            content = "bro this is not text channel, id `" + channelID + "` type: `" + channel.type + "` (https://discord.com/developers/docs/resources/channel) aka " + channel.toString();
        }


        await interaction.followUp({
            ephemeral: false,
            content
        })
    }
}   