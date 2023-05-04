import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from 'discord.js';
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
        },
        {
            name: "assignee",
            description: "User to assign task to, leave empty if assigning to yourself",
            required: false,
            type: ApplicationCommandOptionType.User
        }
    ],
    run: async (interaction: CommandInteraction) => {
        let task = interaction.options.get('task').value.toString();
        let taskId = AddTask(task, interaction.user.id);

        let user = interaction.options.get('assignee')?.user;

        if (user === undefined) {
            user = interaction.user;
        }

        let content = `Set task "${task}" (ID ${taskId}) for ${user}`;

        await interaction.followUp({
            ephemeral: false,
            content
        })
    }
}