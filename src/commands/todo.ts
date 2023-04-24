import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { AddTask } from '../tasks';

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

    async execute(interaction: CommandInteraction) {
        let task = interaction.options.get('task').value.toString();
        let taskId = AddTask(task, interaction.user.id);

        return interaction.reply(`Set task "${task}" (ID ${taskId}) for ${interaction.user}`);
    },
};