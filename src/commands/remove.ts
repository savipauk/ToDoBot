import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { RemoveTask, TasksToString } from '../tasks';

const data = new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove a task by id')
    .addIntegerOption((task) =>
        task.setName('id')
            .setDescription('Id of the task you want to remove')
            .setRequired(true)
    );

module.exports = {
    data,

    async execute(interaction: CommandInteraction) {
        let taskId = interaction.options.get('id').value.toString();
        let task = RemoveTask(parseInt(taskId));

        let newTaskList = TasksToString();

        await interaction.reply(`Task "${task.description}" removed, ${interaction.user}\n\n${newTaskList}`);

    },
};