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
        let json;
        if(id==1){
            array.table.push({id: id, task: taskName, asignee: asignee.id});
            json = JSON.stringify(array);
        }
        else{
            let obj_t = fs.readFileSync("tasks.json");
            obj_t = JSON.parse(obj_t);
            obj_t.table.push({id: id, task: taskName, asignee: asignee.id});
            json = JSON.stringify(obj_t);
        }

        message.reply(`Created task "${taskName}" for ${asignee}`);
        fs.writeFileSync("tasks.json", json, {flag:"w"});
    }

    else if (message.content.startsWith("/display")) {
        let obj_d = fs.readFileSync("tasks.json");
        obj_d = JSON.parse(obj_d);
        let reply = "";
        obj_d.table.forEach(element => {
            reply += `${element.id}. ${element.task}, by <@${element.asignee}> \n`
           // message.reply(`${element.id}. ${element.taskName}, by <@${element.asignee   }>`); 
        });
        message.reply(reply);
    }

    else if (message.content.startsWith("/remove ")) {
        let content = message.content.substring(8);
        let ids = content.split(" ");
        let reply = "";
        let obj_rm = fs.readFileSync("tasks.json");
        obj_rm = JSON.parse(obj_rm);
        ids.forEach(id => {
            console.log(id);
            obj_rm.table.forEach(element => {
                if(id == element.id){
                    reply += `Deleted task: ${element.task}\n`
                    obj_rm.table.splice(element.id-1,1);
                }
            });
        });
        obj_rm = JSON.stringify(obj_rm);
        fs.writeFileSync("tasks.json", obj_rm, {flag:"w"});
        message.reply(reply);
    }
});

client.login(TOKEN);
