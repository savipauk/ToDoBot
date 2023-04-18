const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('display')
        .setDescription('PLACEHOLDER'),
    async execute(interaction) {
        await interaction.reply(`DISPLAY PLACEHOLDER ${interaction.user.username}`);
    },
};