// re-run when you add a new command

require('dotenv').config();


const { REST, Routes } = require('discord.js');

const clientId = process.env.clientId;
const guildId = process.env.guildId;
const token = process.env.token;

const fs = require('fs');
const path = require('path');

let commands = [];

const commandsPath = path.join(__dirname, '/commands');
const commandFiles = fs.readdirSync(commandsPath);

console.log(commandsPath);

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }

}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error) {
        console.error(error);
    }
})();