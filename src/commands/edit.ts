import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from 'discord.js';
import { GetTaskById, SetDescription } from '../tasks';
import { Command } from '../types/Command';

export const Edit: Command = {
    name: "edit",
    description: "Edit task description",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "task",
            description: "Id of the task you are editing",
            required: true,
            type: ApplicationCommandOptionType.Integer
        },
        {
            name: "description",
            description: "New task description",
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    run: async (interaction: CommandInteraction) => {
        let taskId = interaction.options.get('task').value.toString();
        let taskDescription = interaction.options.get('description').value.toString();

        let content = "Task doesn't exist";

        let oldTaskDescription = GetTaskById(parseInt(taskId))?.description;

        if (oldTaskDescription != null) {

            let task = SetDescription(parseInt(taskId), taskDescription);

            content = `Updated task "${oldTaskDescription}" (ID ${taskId})\n\n"${task.description}" for <@${task.assignee}>`;
        }

        await interaction.followUp({
            ephemeral: false,
            content
        })
    }
}