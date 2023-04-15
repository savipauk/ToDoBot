const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const TOKEN = fs.readFileSync("token.txt").toString();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages
    ]
});

client.on("ready", () => {
    console.log(`ready ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.content.startsWith("/todo ")) {
        let asignee = message.author
        let taskName = message.content.substring(6);

        message.reply(`Created task "${taskName}" for ${asignee}`);
        fs.writeFileSync("tasks.txt", `Task: ${taskName}, Created by: ${asignee}\n`, {flag:"a+"});
    }
});

client.on("messageCreate", (message) => {
    if (message.content.startsWith("/display")) {
        
        message.reply(fs.readFileSync("tasks.txt").toString());
    }
});

client.login(TOKEN);
