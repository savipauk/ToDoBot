import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from 'discord.js';
import { RemoveTask, TasksToString } from '../tasks';
import { Command } from '../types/Command';
import { ToDoClient } from '../types/ToDoClient';
import { CloseThreadForTask } from './taskboard';

export const Remove: Command = {
    name: "remove",
    description: "Remove a task by id",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "task",
            description: "Id of the task you want to remove",
            required: true,
            type: ApplicationCommandOptionType.Integer
        }
    ],
    run: async (interaction: CommandInteraction, client: ToDoClient) => {
        let taskId = interaction.options.get('task').value.toString();
        let task = RemoveTask(parseInt(taskId));

        let newTaskList = TasksToString();

        let content = "Task doesn't exist";
        if (task != null) {
            content = `Task "${task.description}" removed, ${interaction.user}\n\n${newTaskList}`;

            if (client.taskboardID != null) {
                await CloseThreadForTask(task, client);
            }
        }

        await interaction.followUp({
            ephemeral: false,
            content
        })
    }
}