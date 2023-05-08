import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction, TextChannel } from 'discord.js';
import { AddTask, SetThreadId } from '../tasks';
import { Command } from '../types/Command';
import { ToDoClient } from '../types/ToDoClient';
import { CreateThreadForTask } from './taskboard';

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
    run: async (interaction: CommandInteraction, client: ToDoClient) => {
        let taskDesc = interaction.options.get('task').value.toString();

        let user = interaction.options.get('assignee')?.user;

        if (user === undefined) {
            user = interaction.user;
        }

        let task = AddTask(taskDesc, user.id);

        if (client.taskboardID != null) {
            let threadId = await CreateThreadForTask(task, client);
            SetThreadId(task.id, threadId);
        }


        let content = `Set task "${taskDesc}" (ID ${task.id}) for ${user}`;

        await interaction.followUp({
            ephemeral: false,
            content
        })
    }
}