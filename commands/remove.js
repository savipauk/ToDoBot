const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('PLACEHOLDER'),
    async execute(interaction) {
        await interaction.reply(`REMOVE PLACEHOLDER ${interaction.user.username}`);
    },
};