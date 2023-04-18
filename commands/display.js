const { SlashCommandBuilder } = require('discord.js');
const { TasksToString } = require('../tasks');

const data = new SlashCommandBuilder()
    .setName('display')
    .setDescription('Returns a list of all tasks');

module.exports = {
    data,

    async execute(interaction) {
        let reply = TasksToString();

        await interaction.reply(`${reply}`);
    },
};