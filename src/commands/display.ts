import { ApplicationCommandType, CommandInteraction } from 'discord.js';
import { TasksToString } from '../tasks';
import { Command } from '../types/Command';

export const Display: Command = {
    name: "display",
    description: "Display all tasks",
    type: ApplicationCommandType.ChatInput,
    run: async (interaction: CommandInteraction) => {
        let content = TasksToString();

        await interaction.followUp({
            ephemeral: false,
            content
        })
    }
}