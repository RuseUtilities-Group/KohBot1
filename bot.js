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
        receivedMessage.channel.send("")
    }
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'announcements');
    if (!channel) return;
    channel.send(`Welcome ${member} to the Server!`);
  });

  client.on('messageReactionAdd', async (reaction, user) => {
    const handleStarboard = async () => {
        const starboard = client.channels.cache.find(channel => channel.name.toLowerCase() === 'starboard');
        const msgs = await starboard.messages.fetch({ limit: 100 });
        const existingMsg = msgs.find(msg => 
            msg.embeds.length === 1 ?
            (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
        if(existingMsg) existingMsg.edit(`${reaction.count} - ⭐`);
        else {
            const embed = new MessageEmbed()
                .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
                .addField('Url', reaction.message.url)
                .setDescription(reaction.message.content)
                .setFooter(reaction.message.id + ' - ' + new Date(reaction.message.createdTimestamp));
            if(starboard)
                starboard.send('1 - ⭐', embed);
        }
    }
    if(reaction.emoji.name === '⭐') {
        if(reaction.message.channel.name.toLowerCase() === 'starboard') return;
        if(reaction.message.partial) {
            await reaction.fetch();
            await reaction.message.fetch();
            handleStarboard();
        }
        else
            handleStarboard();
    }
});
client.on('messageReactionRemove', async (reaction, user) => {
    const handleStarboard = async () => {
        const starboard = client.channels.cache.find(channel => channel.name.toLowerCase() === 'starboard');
        const msgs = await starboard.messages.fetch({ limit: 100 });
        const existingMsg = msgs.find(msg => 
            msg.embeds.length === 1 ? 
            (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
        if(existingMsg) {
            if(reaction.count === 0)
                existingMsg.delete({ timeout: 2500 });
            else
                existingMsg.edit(`${reaction.count} - ⭐`)
        };
    }
    if(reaction.emoji.name === '⭐') {
        if(reaction.message.channel.name.toLowerCase() === 'starboard') return;
        if(reaction.message.partial) {
            await reaction.fetch();
            await reaction.message.fetch();
            handleStarboard();
        }
        else
            handleStarboard();
    }
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
});