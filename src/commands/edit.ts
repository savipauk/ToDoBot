import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction } from 'discord.js';
import { RemoveTask, TasksToString } from '../tasks';
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
    run: async (client: Client, interaction: CommandInteraction) => {
        // let taskId = interaction.options.get('task').value.toString();
        // let task = RemoveTask(parseInt(taskId));

        // let user = interaction.options.get('member').user.id;

        // let newTaskList = TasksToString();


        // console.log(user);

        // let content = "Task doesn't exist";
        // if (task != null) content = `Task "${task.description}" removed, ${interaction.user}\n\n${newTaskList}`;

        let content = "hiii";

        // ephemeral = only you can see (true) or everybody can see (false)
        await interaction.followUp({
            ephemeral: false,
            content
        })
    }
}