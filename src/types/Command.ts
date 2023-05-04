import { ChatInputApplicationCommandData, CommandInteraction } from "discord.js";
import { ToDoClient } from "./ToDoClient";

export interface Command extends ChatInputApplicationCommandData {
    run: (interaction: CommandInteraction, client?: ToDoClient) => void;
}