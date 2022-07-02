require('dotenv').config({
    path: 'D:/Code/discordBot/.env'
}) //.env file 
const appid = require("appid");
const express = require('express');
const axios = require("axios")
var request = require('request');
const {
    Client,
    Intents,
    Guild,
    MessageEmbed,
} = require('discord.js'); //need to use intent since nodejs update
const e = require('express');
const { json } = require('express');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});


const PREFIX = '>'
const command = []
client.login(process.env.DISCORDJS_BOT_TOKEN); //connect the bot 
client.on("ready", () => {
    console.log(`bot ${client.user.username} in online`)

})

client.on('disconnect', function (erMsg, code) {
    console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
    client.connect();
});
//steam api 


//commands
client.on("message",  (message) => {
    if (message.author.bot) {
        return true;
    }
    if (message.content.startsWith(PREFIX)) {
        const [msg_cmd, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        switch (msg_cmd) {
            case "flip":
                message.reply(coinFlip())
                break;

            case "pick":
                message.reply(rndnum(Math.min(args[0], args[1]), (Math.max(args[0], args[1]))));
                break;
            case "clear":
                
                let amount =100;
                let size;
                if (!isNaN(args[0])) {
                    amount = args[0]
                }
                if((amount<2||amount>200)){
                    return message.channel.send("input should be 2-200");
                }
                message.channel.bulkDelete(amount);
                message.channel.send(amount + ' ' + 'messages deleted');
                break;
            case 'charts': 
                 steamStatus(message);
                break;
            case 'current':
                specificGame(message);

        }


    }
})
async function specificGame(message){
    const steamUrl = "http://api.steampowered.com/ISteamApps/GetAppList/v0002/"
    const [msg_cmd, ...args] = message.content
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/);  
    let data = await axios.get(steamUrl);
    data = JSON.stringify(data);
    let gameName 
    let gameid
    if(args[0].isNaN){
        gameid = data.applist.apps.filter(a => a.appid === args[0])[0]
    }
    console.log(gameid)
    
    
}
async function steamStatus(message){
const dotaUrl ='https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=570'
const dotaResponse = await axios.get(dotaUrl);
dotaData = JSON.stringify(dotaResponse.data.response.player_count.toLocaleString('en-US'));
    
const csgoUrl = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=730'
const csResponse = await axios.get(csgoUrl);
csgoData = JSON.stringify(csResponse.data.response.player_count.toLocaleString('en-US'));

const tf2Url = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=440'
const tfResonse = await axios.get(tf2Url);
tf2Data = JSON.stringify(tfResonse.data.response.player_count.toLocaleString('en-US'));

const gtaUrl ="https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=271590";
const response = await axios.get(gtaUrl);


gtaData = JSON.stringify(response.data.response.player_count.toLocaleString('en-US'));

const exampleEmbed = new MessageEmbed()
    .setColor("#black")
    .setTitle("Showing cuncurrent:")
    .setThumbnail("https://imgur.com/GdZOG8J.jpeg")
    .addFields(
            {name: "Grand Theft Auto V", value: gtaData},
            {name:'Team Fortrest 2',value:tf2Data},
            {name:'Counter Strike Go',value:csgoData},
            {name:"Dota 2 ",value:dotaData})
    .setTimestamp();
    message.channel.send({ embeds: [exampleEmbed] });
}

function rndnum(lower, upper) {
    return (Math.floor(Math.random() * (upper - lower + 1)) + lower).toString();
}

function coinFlip() { 
    let number = Math.floor(Math.random() * 2);
    if (number == 0) {
        return "talis";
    } else {
        return "heads";
    }

}
// client.on("message",(message)=>{
//     console.log (`[${message.author.tag}]:  ${message.content}`);

//     //checks if the message has hello and checks if the one who send it wasnt the bot
//     if(message.content ==="hello"&&
//     !message.author.bot){
//          message.channel.send('hello'); 
//     }
// })