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
    const helpEmbed = {
        color: 0xdd0000,
        title: 'Secret Hitler Bot Help Prompt',
        description: 'Prefix: sh!',
        thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/694469683281395742/730017345640333369/hitler-at-dortmund-rally.jpg',
        },
        fields: [
            {
                name: 'Command Name: Command',
                value: 'Description of Command',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            }
        ],
      
        timestamp: new Date(),
        footer: {
            text: 'Secret Hitler Bot By RuseUtilities Group',
            icon_url: 'https://cdn.discordapp.com/attachments/694469683281395742/730017345640333369/hitler-at-dortmund-rally.jpg',
        },
    };
    
    message.channel.send({ embed: helpEmbed });
    
  }

  if(command === "invite") {
    const helpEmbed = {
        color: 0xdd0000,
        title: 'Secret Hitler Bot Invite Link',
        url: 'https://discord.com/api/oauth2/authorize?client_id=730004103719288904&permissions=8&scope=bot',
        description: 'https://discord.com/api/oauth2/authorize?client_id=730004103719288904&permissions=8&scope=bot',
        thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/694469683281395742/730017345640333369/hitler-at-dortmund-rally.jpg',
        },
        
        timestamp: new Date(),
        footer: {
            text: 'Secret Hitler Bot By RuseUtilities Group',
            icon_url: 'https://cdn.discordapp.com/attachments/694469683281395742/730017345640333369/hitler-at-dortmund-rally.jpg',
        },
    };
    
    message.channel.send({ embed: helpEmbed });
    
  }

});