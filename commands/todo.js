const { SlashCommandBuilder } = require('discord.js');

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
        return interaction.reply(`Set task "${task}" for ${interaction.user}`);
    },
};