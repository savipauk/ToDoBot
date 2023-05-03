import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction } from 'discord.js';
import { RemoveTask, TasksToString } from '../tasks';
import { Command } from '../types/Command';

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
    run: async (client: Client, interaction: CommandInteraction) => {
        let taskId = interaction.options.get('task').value.toString();
        let task = RemoveTask(parseInt(taskId));

        let newTaskList = TasksToString();

        let content = "Task doesn't exist";
        if (task != null) content = `Task "${task.description}" removed, ${interaction.user}\n\n${newTaskList}`;

        // ephemeral = only you can see (true) or everybody can see (false)
        await interaction.followUp({
            ephemeral: false,
            content
        })
    }
}