require('dotenv').config();

import { Interaction } from 'discord.js';
import { InteractionCreate } from './commandHandler';
import { Ready } from './ready';
import { ToDoClient } from './types/ToDoClient';

const token = process.env.token;

const client = new ToDoClient();

client.on("ready", async () => {
    Ready(client);
});

client.on("interactionCreate", async (interaction: Interaction) => {
    InteractionCreate(client, interaction);
});

client.login(token);


