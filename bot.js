//node /Users/Joshua/Documents/GitHub/SecretHitlerBot/bot.js
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
});

client.login(config.token);

client.on("ready", () => {
  console.log(`Secret Hitler Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Playing sh!help`);

});

client.on('ready', () => {
    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
    })
})

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return
    }
    if (receivedMessage.content.includes(client.user.toString())) {
        receivedMessage.channel.send("")
    }
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

if(command === "help") {
    const exampleEmbed = {
        color: 0x0099ff,
        title: 'Some title',
        url: 'https://discord.js.org',
        author: {
            name: 'Some name',
            icon_url: 'https://i.imgur.com/wSTFkRM.png',
            url: 'https://discord.js.org',
        },
        description: 'Some description here',
        thumbnail: {
            url: 'https://i.imgur.com/wSTFkRM.png',
        },
        fields: [
            {
                name: 'Regular field title',
                value: 'Some value here',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
        ],
        image: {
            url: 'https://i.imgur.com/wSTFkRM.png',
        },
        timestamp: new Date(),
        footer: {
            text: 'Some footer text here',
            icon_url: 'https://i.imgur.com/wSTFkRM.png',
        },
    };
    
    client.channel.send({ embed: exampleEmbed });
    
  }

});