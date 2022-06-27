require('dotenv').config({path:'D:/Code/discordBot/.env'}) //.env file 

const { Client, Intents } = require('discord.js'); //need to use intent since nodejs update

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.login(process.env.DISCORDJS_BOT_TOKEN); //connect the bot 
client.on("ready",() => {
    console.log(`bot ${client.user.username} in online`)
})


client.on("message",(message)=>{
    console.log (`[${message.author.tag}]:  ${message.content}`);
   
    //checks if the message has hello and checks if the one who send it wasnt the bot
    if(message.content ==="hello"&&
    !message.author.bot){
         message.channel.send('hello'); 
    }
})



