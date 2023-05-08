import { Client, GatewayIntentBits } from "discord.js";

export class ToDoClient extends Client {
    taskboardID: string = null;

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.DirectMessages
            ]
        })
    }
}