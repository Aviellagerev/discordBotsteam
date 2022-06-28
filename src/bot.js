require('dotenv').config({
    path: 'D:/Code/discordBot/.env'
}) //.env file 
const appid = require("appid");
const express = require('express');
var request = require('request');
const {
    Client,
    Intents,
    Guild
} = require('discord.js'); //need to use intent since nodejs update
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
    steamStatus();
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
function steamStatus(){
    const steamUral ='https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid='
    let steamData =''
    request(steamUral, function(err, res, body) {
		if(!err && res.statusCode < 400) {
            steamData+=body
		}
	});	
    const dotaUrl ='https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=730'
    let bodyDota =""
	request(dotaUrl, function(err, res, body) {
		if(!err && res.statusCode < 400) {
		bodyDota+=body
		}
	});	
    const csgoUrl = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=730'
    let csgoData = '';
    request(csgoUrl, function(err, res, body) {
		if(!err && res.statusCode < 400) {
		csgoData+=body;
		}
	});	
    console.log(csgoData);
//     https.get("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=", res => {
//     res.setEncoding("utf8");
//     let bodyAll = "";
//     res.on("data", dataAll => {
//       bodyAll += dataAll;
//     });
//     res.on("end", () => {
//       bodyAll = JSON.parse(bodyAll);

//       https.get("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=570", res => {
//         res.setEncoding("utf8");
//         let bodyDota = "";
//         res.on("data", dataDota => {
//           bodyDota += dataDota;
//         });
//         res.on("end", () => {
//           bodyDota = JSON.parse(bodyDota);

//           https.get("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=730", res => {
//             res.setEncoding("utf8");
//             let bodyCSGO = "";
//             res.on("data", dataCSGO => {
//               bodyCSGO += dataCSGO;
//             });
//             res.on("end", () => {
//               bodyCSGO = JSON.parse(bodyCSGO);

//               https.get("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=440", res => {
//                 res.setEncoding("utf8");
//                 let bodyTF = "";
//                 res.on("data", dataTF => {
//                   bodyTF += dataTF;
//                 });
//                 res.on("end", () => {
//                   bodyTF = JSON.parse(bodyTF);

//                   https.get("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=271590", res => {
//                     res.setEncoding("utf8");
//                     let bodyGTA = "";
//                     res.on("data", dataGTA => {
//                       bodyGTA += dataGTA;
//                     });
//                     res.on("end", () => {
//                       bodyGTA = JSON.parse(bodyGTA);

//                       https.get("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=KEY&format=json&appid=578080", res => {
//                         res.setEncoding("utf8");
//                         let bodyPUBG = "";
//                         res.on("data", dataPUBG => {
//                           bodyPUBG += dataPUBG;
//                         });
//                         res.on("end", () => {
//                           bodyPUBG = JSON.parse(bodyPUBG);

//                           console.log(bodyAll);
//                         });
//                       });
//                     });
//                   });
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//   });
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