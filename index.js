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

let id = 0;
let array = {
    table: []
 };
fs.writeFileSync("tasks.json", "", {flag:"w"});

client.on("ready", () => {
    console.log(`ready ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.content.startsWith("/todo ")) {
        id++
        let asignee = message.author;
        let taskName = message.content.substring(6);
        
        array.table.push({id: id, task: taskName, asignee: asignee.id});
        let json = JSON.stringify(array);

        message.reply(`Created task "${taskName}" for ${asignee}`);
        fs.writeFileSync("tasks.json", json, {flag:"w"});
    }

    else if (message.content.startsWith("/display")) {
        let obj = fs.readFileSync("tasks.json");
        obj = JSON.parse(obj);
        let reply = "";
        obj.table.forEach(element => {
            reply += `${element.id}. ${element.task}, by <@${element.asignee}> \n`
           // message.reply(`${element.id}. ${element.taskName}, by <@${element.asignee   }>`); 
        });
        message.reply(reply);
    }
});

client.login(TOKEN);
