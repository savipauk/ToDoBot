const { SlashCommandBuilder } = require('discord.js');
const { AddTask } = require('../tasks');

const data = new SlashCommandBuilder()
    .setName('todo')
    .setDescription('Create a new task')
    .addStringOption((task) =>
        task.setName('task')
            .setDescription('Task description')
            .setRequired(true)
    );

module.exports = {
    data,

    async execute(interaction) {
        let task = interaction.options.getString('task');
        let taskId = AddTask(task, interaction.user.id);
        return interaction.reply(`Set task "${task}" (ID ${taskId}) for ${interaction.user}`);
    },
};