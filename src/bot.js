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

    steamStatus(message);
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
                
        }


    }
})
async function steamStatus(message){
    const dotaUrl ='https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=730'
    let dotaData =""
	await request(dotaUrl, function(err, res, body) {
		if(!err && res.statusCode < 400) {
		 dotaData += body
		}
	});	
    
    const csgoUrl = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=730'
    let csgoData = '';
    await request(csgoUrl, function(err, res, body) {
		if(!err && res.statusCode < 400) {
		csgoData+=body;
		}
	});	
    const tf2Url = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=440'
    let  tfdata ='';
    await request(tf2Url,function(err,res,body){
        if(!err&&res.statusCode<400){
        tfdata +=body;
        }
     res.on('end',()=>{tfdata =JSON.parse(tfdata)})
    })
    const gtaUrl =
    "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=271590";
  
const response = await axios.get(gtaUrl);
gtaData = JSON.stringify(response.data);
const exampleEmbed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Showing concurrent player numbers for some games")
    .setDescription("the game")
    .setThumbnail("https://i.imgur.com/FNviTdG.jpeg")
    .addFields({ name: "Grand Theft Auto V", value: gtaData.})
    .addField("Inline field title", "Some value here", true)
    .setImage("https://i.imgur.com/AfFp7pu.png")
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