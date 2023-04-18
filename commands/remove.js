const { SlashCommandBuilder } = require('discord.js');
const { RemoveTask, TasksToString } = require('../tasks');

const data = new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove a task by id')
    .addIntegerOption((task) =>
        task.setName('id')
            .setDescription('Id of you want to remove')
            .setRequired(true)
    );

module.exports = {
    data,

    async execute(interaction) {
        let taskId = interaction.options.getInteger('id');
        let task = RemoveTask(taskId);

        let newTaskList = TasksToString();

        await interaction.reply(`Task "${task.description}" removed, ${interaction.user}\n\n${newTaskList}`);

    },
};