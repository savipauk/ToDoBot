import { CommandInteraction, Interaction } from "discord.js";
import { Commands } from "./Commands";
import { ToDoClient } from "./types/ToDoClient";

export async function InteractionCreate(client: ToDoClient, interaction: Interaction) {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
        await handleSlashCommand(client, interaction);
    }
}

export async function handleSlashCommand(client: ToDoClient, interaction: CommandInteraction): Promise<void> {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    await interaction.deferReply();

    slashCommand.run(interaction, client);
};