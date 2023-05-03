import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction } from 'discord.js';
import { SetAssignee } from '../tasks';
import { Command } from '../types/Command';

export const Assign: Command = {
    name: "assign",
    description: "Assign a task to a member",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "task",
            description: "Id of the task you are assigning",
            required: true,
            type: ApplicationCommandOptionType.Integer
        },
        {
            name: "assignee",
            description: "User to assign task to, leave empty if assigning to yourself",
            required: false,
            type: ApplicationCommandOptionType.User
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        let taskId = interaction.options.get('task').value.toString();

        let content = "Task doesn't exist";

        let user = interaction.options.get('assignee')?.user;

        if (user === undefined) {
            user = interaction.user;
        }

        let task = SetAssignee(parseInt(taskId), user);

        if (task != null) {
            content = `Task "${task.description}" assigned to ${user}`;
        }

        // ephemeral = only you can see (true) or everybody can see (false)
        await interaction.followUp({
            ephemeral: false,
            content
        })
    }
}