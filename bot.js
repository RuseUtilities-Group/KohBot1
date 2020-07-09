const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const snipes = require("./snipe.json");
const ytdl = require('ytdl-core');


process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
});

client.login(config.token);

client.on("ready", () => {
  console.log(`RuseChat Bot V2 has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Playing r!help`);

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
        receivedMessage.channel.send("Hi There!")
    }
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'announcements');
    if (!channel) return;
    channel.send(`Welcome ${member} to the Server!`);
  });

client.on('message', message => {
	if (message.content === 'r!play') {
		if (message.channel.type !== 'text') return;

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		voiceChannel.join().then(connection => {
			const stream = ytdl('https://www.youtube.com/watch?v=D57Y1PruTlw', { filter: 'audioonly' });
			const dispatcher = connection.play(stream);

			dispatcher.on('finish', () => voiceChannel.leave());
		});
	}
});
//  console.log(message.mentions); Shows every single message
client.on('message', message => {
  if(message.author.bot) return;
  if(message.content.toLowerCase().startsWith('pog')) { message.channel.send("https://cdn.discordapp.com/emojis/710485634665545809.png?v=1")}
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

if(command === "help") {
    const helpEmbed = {
        color: 0x175342,
        title: 'RuseChat Bot V2 Help Prompt',
        description: 'Prefix: r!',
        thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/694469683281395742/730046707345391716/ruselogo.png',
        },
        fields: [
            {
                name: 'Help: r!help',
                value: 'Displays this prompt showing a list of commands and how to use them.',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'Invite: r!invite',
                value: 'Displays a prompt showing the invite link for this bot.',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'Say: r!say [message]',
                value: 'Displays the message on this bot, said by the user.',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'Ping: r!ping',
                value: 'Displays the true ping and API latency ping of the bot to the user.',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'Purge: r!purge [number]',
                value: 'Deletes the specified amount of messages sent prior for mass clean.',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },{
                name: 'Kick: r!kick [@user] [reason]',
                value: 'Kicks specified user. Both Bot and User should have kick and/or moderator roles to do so.',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },{
                name: 'Ban: r!ban [@user] [reason]',
                value: 'Bans specified user. Both Bot and User should have Ban and/or Administrator roles to do so',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'Poll: r!poll [question]',
                value: 'Creates a poll where the bot reacts with thumbs up and down.',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },{
              name: 'Roll: r!roll [Amount of Sides]',
              value: 'Generates a random number between 1 and the Amount of sides (min 2) given.',
          },
          {
              name: '\u200b',
              value: '\u200b',
              inline: false,
          },{
            name: 'User Stats: r!userstats [User Ping/ID]',
            value: 'Displays a prompt with user information, and avatar image.',
        },
        {
            name: '\u200b',
            value: '\u200b',
            inline: false,
        },{
                name: 'More Commands Soon to Come!',
                value: 'DM @theRadOngKid2#1241 for feedback and bug reports.',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
        ],
      
        timestamp: new Date(),
        footer: {
            text: 'RuseChat Bot V2 By RuseUtilities Group',
            icon_url: 'https://cdn.discordapp.com/attachments/694469683281395742/730046707345391716/ruselogo.png',
        },
    };
    
    message.channel.send({ embed: helpEmbed });
    
  }

  if(command === "invite") {
    const inviteEmbed = {
        color: 0x175342,
        title: 'RuseChat Bot V2 Invite Link',
        description: 'https://discord.com/api/oauth2/authorize?client_id=730004103719288904&permissions=2147483639&scope=bot',
        thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/694469683281395742/730046707345391716/ruselogo.png',
        },
        
        timestamp: new Date(),
        footer: {
            text: 'RuseChat Bot V2 By RuseUtilities Group',
            icon_url: 'https://cdn.discordapp.com/attachments/694469683281395742/730046707345391716/ruselogo.png',
        },
    };
    
    message.channel.send({ embed: inviteEmbed });
    
  }

//moderation commands

if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);

}



if(command === "ping") {
    const m = await message.channel.send("Ping!");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }



if(command === "purge") {
  if(!message.member.roles.some(r=>["Defenestration Administration", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }



   if(command === "kick") {
    if(!message.member.roles.some(r=>["Defenestration Administration", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }


  
  if(command === "ban") {
    if(!message.member.roles.some(r=>["Defenestration Administration"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "poll") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage).then(messageReaction =>{
        messageReaction.react('👍');
        messageReaction.react('👎'); 
    });
}

if(command === "reactrole") {
  const roleMentioned = args.join(" ");
  function getUserFromMention(mentionedRole) {
    const matches = mentionedRole.match(/^<@!?(\d+)>$/);
    if (!matches){
      message.channel.send("Please Enter a Valid Role after the command seperated with a space.");
    };
    
    const id = matches[1];
  
    let roleId = client.users.cache.get(id);
    message.channel.send(roleId);
  
  }
  message.delete().catch(O_o=>{}); 
  let reactionMessage = `React to this Message to get the role **${roleMentioned}**:`
  const reactEmbed = {
    color: 0x175342,
    title: reactionMessage,
};

message.channel.send({ embed: reactEmbed }).then(messageReaction =>{
  messageReaction.react('👍');
});
}


if(command === "roll") {
  const sidesCount = parseInt(args[0], 10);
  if(!sidesCount || sidesCount < 2)
    return message.reply("Please provide a number between 2 and Infinity for the Max number on the dice to roll");
    var dice = {
      sides: sidesCount,
      roll: function () {
        var randomNumber = Math.floor(Math.random() * this.sides) + 1;
        return randomNumber;
      }
    }
    var result = dice.roll();
    message.channel.send(result)
    
}


if(command === "userstats") {
  const args = message.content.split(' ');
    console.log(args);
    if(args.length > 2) {
      message.channel.send(`Incorrect Usage: !stats | !stats <user_id> | !stats @mention`);
    } else if(args.length === 2) {
      const member = message.mentions.members.size === 1 ? 
        message.mentions.members.first() :
        message.guild.members.cache.get(args[1]);
      if(member) {
        const userEmbed = {
          color: 0x175342,
          title: `${member.user.tag} (${member.id})`,
          thumbnail: {
            url: member.user.avatarURL
          },
          fields: [
            {
              name: "User Created On",
              value: member.user.createdAt.toLocaleString()
            },
            {
              name: "User Joined the Server On",
              value: member.joinedAt
            },
            {
              name: "User Status",
              value: member.presence.status
            }
          ],
        timestamp: new Date(),
        footer: {
            text: 'RuseChat Bot V2 By RuseUtilities Group',
            icon_url: 'https://cdn.discordapp.com/attachments/694469683281395742/730046707345391716/ruselogo.png',
        },
        }
        
        message.channel.send({ embed: userEmbed });
      } else {
        message.channel.send(`I couldn't find that member with ID ${args[1]}`);
      }
      
    } else {
      message.channel.send("Include a user id/ping after r!userstats")
}}

 //Game Commands
 if(command === "startSHgame") {
    const sgEmbed = {
        color: 0x175342,
        title: 'A Game of Secret Hitler Awaits You',
        description: 'Please type in the number of players (min 5, max 8) to start the game...',
        thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/694469683281395742/730046707345391716/ruselogo.png',
        },
        
        timestamp: new Date(),
        footer: {
            text: 'RuseChat Bot V2 By RuseUtilities Group',
            icon_url: 'https://cdn.discordapp.com/attachments/694469683281395742/730046707345391716/ruselogo.png',
        },
    };
    
    message.channel.send({ embed: sgEmbed });
    
  } 

if(command === "rdg") {
  var num = 0
  var amountWins = 0
  var winMessage

  const gameAmounts = args.join(" ");
  var gaNum = parseInt(gameAmounts, 10)
  if(!gaNum){
    gaNum = 1
  }

  
  while(num !== gaNum) {

    var dice1 = {
      sides: 6,
      roll: function () {
        var randomNumber = Math.floor(Math.random() * this.sides) + 1;
        return randomNumber;
      }
    }

    result1 = parseInt(dice1.roll(), 10);

    var dice2 = {
      sides: 6,
      roll: function () {
        var randomNumber = Math.floor(Math.random() * this.sides) + 1;
        return randomNumber;
      }
    }

    result2 = parseInt(dice2.roll(), 10);

    if(result1 > result2){
      winMessage = `You win this round!`
      amountWins++
    }else if(result1 < result2){
      winMessage = `Bot wins this round!`
    }else if(result1 === result2){
      winMessage = 'You and the Bot Tied!'
    }
    const rgEmbed = {
      color: 0x175342,
      title: `DRG Round ${num + 1} Results:`,
      thumbnail: {
          url: 'https://cdn.discordapp.com/attachments/694469683281395742/730759143161331803/Dice-6-6-1.png',
      },
      fields: [
        {
          name: "You Rolled a:",
          value: result1
        },
        {
          name: "Bot Rolled a:",
          value: result2
        },
        {
          name: winMessage,
          value: ":)"
        }
      ],
      
      timestamp: new Date()
    };

    message.channel.send({ embed: rgEmbed });
    num++

  }

  const endEmbed = {
    color: 0x175342,
    title: 'Game Results:',
    description: `You won ${amountWins} out of ${num} games!`,
    thumbnail: {
        url: 'https://cdn.discordapp.com/attachments/694469683281395742/730759143161331803/Dice-6-6-1.png',
    },
    
    timestamp: new Date(),
    footer: {
        text: 'RuseChat Bot V2 By RuseUtilities Group',
        icon_url: 'https://cdn.discordapp.com/attachments/694469683281395742/730046707345391716/ruselogo.png',
    },
};

message.channel.send({ embed: endEmbed });

}
});