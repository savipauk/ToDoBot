import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction } from 'discord.js';
import { RemoveTask, TasksToString } from '../tasks';
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
            name: "member",
            description: "Member to assign task to, leave empty if assigning to yourself",
            required: false,
            type: ApplicationCommandOptionType.User
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

        // no functionality

        let content = "hi";

        // ephemeral = only you can see (true) or everybody can see (false)
        await interaction.followUp({
            ephemeral: false,
            content
        })
    }
}