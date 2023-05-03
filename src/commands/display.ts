import { ApplicationCommandType, Client, CommandInteraction } from 'discord.js';
import { TasksToString } from '../tasks';
import { Command } from '../types/Command';

export const Display: Command = {
    name: "display",
    description: "Display all tasks",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        let content = TasksToString();

        // ephemeral = only you can see (true) or everybody can see (false)
        await interaction.followUp({
            ephemeral: false,
            content
        })
    }
}