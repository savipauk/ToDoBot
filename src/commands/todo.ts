import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction } from 'discord.js';
import { AddTask } from '../tasks';
import { Command } from '../types/Command';

export const Todo: Command = {
    name: "todo",
    description: "Create a new task",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "task",
            description: "Task description",
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        let task = interaction.options.get('task').value.toString();
        let taskId = AddTask(task, interaction.user.id);

        let content = `Set task "${task}" (ID ${taskId}) for ${interaction.user}`;

        // ephemeral = only you can see (true) or everybody can see (false)
        await interaction.followUp({
            ephemeral: false,
            content
        })
    }
}