const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json")
const token = process.env.token;
var fs = require("fs");
const Util = require('discord.js');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const queue = new Map();
const ytdl = require('ytdl-core');





//Error Handler
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
});


//Client Login
client.login(token);




//Terminal User Interface
client.on("ready", () => {
  console.log(`KohBot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Playing k!help`);

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











//Ruse-High Link
client.on('message', message => {
  if(message.author.bot) return;
  let guild = message.guild;
  let member = guild.member(message.author);
  let nickname = member ? member.displayName : null;
  if(message.channel.id === "735085499571765288"){
    if(message.author.id() === "258542471015825410") return;
      var messageContent = message.content;
      client.channels.get('735084968476278805').send(`${nickname} (Ruse): ${messageContent}`);
  }
});

client.on('message', message => {
  if(message.author.bot) return;
  let guild = message.guild;
  let member = guild.member(message.author);
  let nickname = member ? member.displayName : null;
  if(message.channel.id === "735084968476278805"){
    var messageContent = message.content;
    client.channels.get('735085499571765288').send(`${nickname} (High): ${messageContent}`)
  }
});









//  console.log(message.mentions); Shows every single message



client.on('message', message => {
  if(message.author.bot) return;
  if(message.content.toLowerCase().includes('trump')) { message.channel.send("Trump Gay, Vote Biden")}
}); 




client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();







if(command === "help") {
    const helpEmbed = {
        color: 0x9932CC,
        title: 'RuseChat Bot V2 Help Prompt',
        description: 'Prefix: k!',
        thumbnail: {
            url: 'https://cdn.discordapp.com/avatars/730004103719288904/ce269b42ef41f924bdeb4e3de9d0cb26.png?size=2048',
        },
        fields: [
            {
                name: 'Help: k!help',
                value: 'Displays this prompt showing a list of commands and how to use them.',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'Invite: k!invite',
                value: 'Displays a prompt showing the invite link for this bot.',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'Say: k!say [message]',
                value: 'Displays the message on this bot, said by the user.',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'Ping: k!ping',
                value: 'Displays the true ping and API latency ping of the bot to the user.',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'Purge: k!purge [number]',
                value: 'Deletes the specified amount of messages sent prior for mass clean.',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },{
                name: 'Kick: k!kick [@user] [reason]',
                value: 'Kicks specified user. Both Bot and User should have kick and/or moderator roles to do so.',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },{
                name: 'Ban: k!ban [@user] [reason]',
                value: 'Bans specified user. Both Bot and User should have Ban and/or Administrator roles to do so',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },{
              name: 'Warn: k!warn [@user] [reason]',
              value: 'Warns specified user. Both User should have Administrator or Moderator roles to do so',
          },
          {
              name: '\u200b',
              value: '\u200b',
              inline: false,
          },{
            name: 'Mass Role Assign: k!massignrole [@role] [@user] [@user1] [@user2]...',
            value: 'Assigns the role to many people mentioned, Member needs mod or above to use this command.',
        },
        {
            name: '\u200b',
            value: '\u200b',
            inline: false,
        },{
        name: 'Mass Role Removal: k!massremoverole [@role] [@user] [@user1] [@user2]...',
        value: 'Removes the role to many people mentioned, Member needs mod or above to use this command.',
    },
    {
        name: '\u200b',
        value: '\u200b',
        inline: false,
    },
            {
                name: 'Poll: k!poll [question]',
                value: 'Creates a poll where the bot reacts with thumbs up and down.',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },{
              name: 'Roll: k!roll [Amount of Sides]',
              value: 'Generates a random number between 1 and the Amount of sides (min 2) given.',
          },
          {
              name: '\u200b',
              value: '\u200b',
              inline: false,
          },{
            name: 'User Stats: k!userstats [User Ping/ID]',
            value: 'Displays a prompt with user information, and avatar image.',
        },
        {
            name: '\u200b',
            value: '\u200b',
            inline: false,
        },{
          name: 'Dice Rolling Game: k!rdg [Amount of Rounds to Play]',
          value: 'A minigame where you and the bot roll dice! *Note: You can only play maximum of 15 rounds',
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
            text: 'KohBot by Joshua Koh',
            icon_url: 'https://cdn.discordapp.com/avatars/730004103719288904/ce269b42ef41f924bdeb4e3de9d0cb26.png?size=2048',
        },
    };
    
    message.channel.send({ embed: helpEmbed });
    
  }














  if(command === "invite") {
    const inviteEmbed = {
        color: 0x9932CC,
        title: 'RuseChat Bot V2 Invite Link',
        description: 'https://discord.com/api/oauth2/authorize?client_id=730004103719288904&permissions=2147483639&scope=bot',
        thumbnail: {
            url: 'https://cdn.discordapp.com/avatars/730004103719288904/ce269b42ef41f924bdeb4e3de9d0cb26.png?size=2048',
        },
        
        timestamp: new Date(),
        footer: {
            text: 'KohBot by Joshua Koh',
            icon_url: 'https://cdn.discordapp.com/avatars/730004103719288904/ce269b42ef41f924bdeb4e3de9d0cb26.png?size=2048',
        },
    };
    
    message.channel.send({ embed: inviteEmbed });
    
  }












//moderation commands

if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(`${sayMessage}`);

}












if(command === "ping") {
    const m = await message.channel.send("Ping!");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
















if(command === "purge") {
  if(!message.member.roles.some(r=>["Trump Administration", "Admin", "Owner", "Senior Admin/ Vice Owner", "Admin 1", "Admin 2", "Admin 3", "Trial Admin", "Minor Mod", "Mod", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 10000)
      return message.reply("Please provide a number between 2 and 10000 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

















   if(command === "kick") {
    if(!message.member.roles.some(r=>["Trump Administration", "Admin", "Owner", "Senior Admin/ Vice Owner", "Admin 1", "Admin 2", "Admin 3", "Trial Admin", "Minor Mod", "Mod", "Moderator"].includes(r.name)) )
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
    if(!message.member.roles.some(r=>["Trump Administration", "Admin", "Owner", "Senior Admin/ Vice Owner", "Admin 1", "Admin 2", "Admin 3", "Trial Admin", "Minor Mod", "Mod", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this usek! Do they have a higher role? Do I have ban permissions?");

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
    color: 0x9932CC,
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


















if(command === "warn"){
  if(!message.member.roles.some(r=>["Trump Administration", "Admin", "Owner", "Senior Admin/ Vice Owner", "Admin 1", "Admin 2", "Admin 3", "Trial Admin", "Minor Mod", "Mod", "Moderator", "selling wraith prism for $40"].includes(r.name)))
      return message.reply("Sorry, you don't have permissions to use this!");

  let moderator = message.member.user
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member){return message.channel.send("Please Specify a Member to Be Warned")}

  let memberId = message.mentions.members.first().id
  let nickname = member ? member.displayName : null;
  let reason = args.slice(1).join(' ');
  let server = message.guild.name;
    if(!reason){reason = "No reason provided"};
  
    const warnEmbed = {
      color: 0x9932CC,
      title: `Warn Log:`,
      thumbnail: {
        url: member.user.avatarURL
      },
      fields: [
        {
        name: `Warned User: @${nickname}`,
        value: `Warn Reason: ${reason}\n User Id: ${memberId}\n Moderator: ${moderator}\n Server: ${server}`
        },
      ],
      timestamp: new Date(),
        footer: {
            text: 'KohBot by Joshua Koh',
            icon_url: 'https://cdn.discordapp.com/avatars/730004103719288904/ce269b42ef41f924bdeb4e3de9d0cb26.png?size=2048',
        },
    };
    message.channel.send({ embed: warnEmbed });
    client.users.get(memberId).send(`You have been warned in ${server} for ${reason}`);
};


















if(command === "userstats") {
  const args = message.content.split(' ');
    console.log(args);
    if(args.length > 2) {
      message.channel.send(`Incorrect Usage: !stats | !stats <user_id> | !stats @mention`);
    } else if(args.length === 2) {
      const member = message.mentions.members.size === 1 ? 
        message.mentions.members.first() :
        message.guild.members.cache.get(args[1]);
        let nickname = member ? member.displayName : null;
      if(member) {
        const userEmbed = {
          color: 0x9932CC,
          title: `${nickname}`,
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
            text: 'KohBot by Joshua Koh',
            icon_url: 'https://cdn.discordapp.com/avatars/730004103719288904/ce269b42ef41f924bdeb4e3de9d0cb26.png?size=2048',
        },
        }
        
        message.channel.send({ embed: userEmbed });
      } else {
        message.channel.send(`I couldn't find that member with ID ${args[1]}`);
      }
      
    } else {
      message.channel.send("Include a user id/ping after k!userstats")
}}



















if (command === "massignrole") {
  if(!message.member.roles.some(r=>["Trump Administration", "Admin", "Owner", "Senior Admin/ Vice Owner", "Admin 1", "Admin 2", "Admin 3", "Trial Admin", "Minor Mod", "Mod", "Moderator"].includes(r.name)))
      return message.reply("Sorry, you don't have permissions to use this!");
  const Role = message.mentions.roles.first();
  if(!Role){
    return message.reply("Please Specify the Right Role and User in the Right Format");
  };
  message.mentions.members.forEach(member => {
      member.addRole(Role).catch(e => console.error(e));
  });

  message.channel.send(`Added role ${Role.name} to ${message.mentions.members.map(member => member.user.tag).join(", ")}.`);
  message.delete().catch(O_o=>{}); 
}




if (command === "massremoverole") {
  if(!message.member.roles.some(r=>["Trump Administration", "Admin", "Owner", "Senior Admin/ Vice Owner", "Admin 1", "Admin 2", "Admin 3", "Trial Admin", "Minor Mod", "Mod", "Moderator"].includes(r.name)))
      return message.reply("Sorry, you don't have permissions to use this!");
  const Role = message.mentions.roles.first();
  if(!Role){
    return message.reply("Please Specify the Right Role and User in the Right Format")
  }
  message.mentions.members.forEach(member => {
      member.removeRole(Role).catch(e => console.error(e));
  });

  message.channel.send(`Removed role ${Role.name} to ${message.mentions.members.map(member => member.user.tag).join(", ")}.`);
  message.delete().catch(O_o=>{}); 
}


















 //Game Commands
 if(command === "startSHgame") {
    const sgEmbed = {
        color: 0x9932CC,
        title: 'A Game of Secret Hitler Awaits You',
        description: 'Please type in the number of players (min 5, max 8) to start the game...',
        thumbnail: {
            url: 'https://cdn.discordapp.com/avatars/730004103719288904/ce269b42ef41f924bdeb4e3de9d0cb26.png?size=2048',
        },
        
        timestamp: new Date(),
        footer: {
            text: 'KohBot by Joshua Koh',
            icon_url: 'https://cdn.discordapp.com/avatars/730004103719288904/ce269b42ef41f924bdeb4e3de9d0cb26.png?size=2048',
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
  if(gaNum > 15){
    message.channel.send("You can play a maximum of 15 rounds")
    gaNum = 0
  }else if(!gaNum){
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
      color: 0x9932CC,
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
          value: "🎲"
        }
      ],
      
      timestamp: new Date()
    };

    message.channel.send({ embed: rgEmbed });
    num++

  }

  const endEmbed = {
    color: 0x9932CC,
    title: 'Game Results:',
    description: `You won ${amountWins} out of ${num} games!`,
    thumbnail: {
        url: 'https://cdn.discordapp.com/attachments/694469683281395742/730759143161331803/Dice-6-6-1.png',
    },
    
    timestamp: new Date(),
    footer: {
        text: 'KohBot by Joshua Koh',
        icon_url: 'https://cdn.discordapp.com/avatars/730004103719288904/ce269b42ef41f924bdeb4e3de9d0cb26.png?size=2048',
    },
  };
  message.channel.send({ embed: endEmbed });

}


if(command === "skribblprint"){
  fs.readFile("skribblDictionary.txt", function(err, buf) {
    message.channel.send(buf.toString());
  });
};


if(command === "skribbladd"){
  var data = "New File Contents";

fs.writeFile("temp.txt", data, (err) => {
  if (err) console.log(err);
  console.log("Successfully Written to File.");
});

}

















if(command === "guessnum") {

  let count = 1
  let maxCount = 4
  let maxNum

  const roundInString = args.join(" ");
  maxNum = parseInt(roundInString, 10)
  if(maxNum > 100){
    message.channel.send("The bot can only generate a number between 1 and maximum 100, Try Again but this time follow the rules :)")
    maxNum = null
  }else if(!gaNum){
    maxNum = 10
  }
 
  var dice = {
    sides: maxNum,
    roll: function () {
      var randomNumber = Math.floor(Math.random() * this.sides) + 1;
      return randomNumber;
    }
  }
  var numThinkingOf = dice.roll();
  console.log(`I'm thinking of ${numThinkingOf}`)


  const displayMessageEmbed = {
    color: 0x9932CC,
    title: `I am Thinking of a Number Between 1 and ${maxNum}`,
    description: `You have 3 Chances (5 secs each) to guess the number, Type your guess in chat...`,
    thumbnail: {
        url: 'https://cdn.discordapp.com/attachments/694469683281395742/731318220652281976/86qLqaUq_400x400.png',
    },
    
    timestamp: new Date(),
    footer: {
        text: 'KohBot by Joshua Koh',
        icon_url: 'https://cdn.discordapp.com/avatars/730004103719288904/ce269b42ef41f924bdeb4e3de9d0cb26.png?size=2048',
    },
  };

  message.channel.send({ embed: displayMessageEmbed });


  const correctMessageEmbed = {
    color: 0x9932CC,
    title: `Correct Answer`,
    description: `You won on guess number ${count}`,
    thumbnail: {
        url: 'https://cdn.discordapp.com/attachments/694469683281395742/731318220652281976/86qLqaUq_400x400.png',
    },
    
    timestamp: new Date(),
    footer: {
        text: 'KohBot by Joshua Koh',
        icon_url: 'https://cdn.discordapp.com/avatars/730004103719288904/ce269b42ef41f924bdeb4e3de9d0cb26.png?size=2048',
    },
  };

  const loseMessageEmbed = {
    color: 0x9932CC,
    title: `You Lost!`,
    description: `The number I was thinking of was ${numThinkingOf}`,
    thumbnail: {
        url: 'https://cdn.discordapp.com/attachments/694469683281395742/731318220652281976/86qLqaUq_400x400.png',
    },
    
    timestamp: new Date(),
    footer: {
        text: 'KohBot by Joshua Koh',
        icon_url: 'https://cdn.discordapp.com/avatars/730004103719288904/ce269b42ef41f924bdeb4e3de9d0cb26.png?size=2048',
    },
  };

  function messageHandle(){
    
    

    if(count > maxCount){
      clearInterval(intervalFunct)}else{
        if(count === 4){
          message.channel.send({ embed: loseMessageEmbed });
        }
        var guessedNum = parseInt(message.content, 10)

        if(guessedNum === numThinkingOf) {
          message.channel.send({ embed: correctMessageEmbed });
          count = 3
        }else if(guessedNum > numThinkingOf){
          message.channel.send(`The number is LOWER, Try again... You have ${maxCount - count} try(s) left`)
        }else if(guessedNum < numThinkingOf){
          message.channel.send(`The number is HIGHER, Try again... You have ${maxCount - count} try(s) left`)
        }else{
          message.channel.send("!!!WRONG ANSWER!!!")
  }
        count++
    }
  }
  var intervalFunct = setInterval(messageHandle, 5000 );
}


}); 















//Delphine Blocker
client.on("message", message => {
  var delphineYTvids = [
    "belledelphine",
    "BelleDelphine",
    "UCXvKUavCtDOlA8bT1i2tI3w",
    "IoHZp57O1AY",
    "TL470fJMi7w",
    "iY27pp3vnrA",
    "A_D9mR8bTI8",
    "fx5WJZuGA0I",
    "9r0Xe7ESrBE",
    "2CG6nFV"
  ];
  if(message.content.includes("https://www.kronos.com.au/products/time-and-attendance")){
      message.delete();
  };
  for(num in delphineYTvids){
    if(message.content.includes(delphineYTvids[num])){
      message.delete();
      message.channel.send("A message containg a Belle Delphine Youtube Links has been detected and deleted!")
  };
  };
});



function rng(num){
  return Math.floor (Math.random() * (num - 1 + 1)) + 1;
}

//Dictionaries
const greetings = [
  "|hi",
  "|hello",
  "|sup",
  "|hey",
  "|yo"
]

const greetingresponse = [
  '',
  "Whats on your mind?",
  "Hows it going?",
  "Hows your day been?",
  "Whats brewing?"
]
client.on("message", message => {
  if(message.author.bot) return;
  //if(message.channel.id !== "688568369636442116"){
  //  return;
  //}
  var messageText = message.content.toLowerCase();

  for(num in greetings){
    if(messageText.includes(greetings[num])){
      var response = rng(4)
      response = greetingresponse[response]
      message.channel.send(`Hi There, ${message.author}! ${response}`);
    }
  }

  if(messageText.startsWith("|search")){
    var googlePrefix = "https://www.google.com/search?-b-d&q="
    const args = message.content.slice(7).trim().split(/ +/g);
    const gameAmounts = args.join("+");
    var search = googlePrefix + gameAmounts
    message.reply("Heres the google link:" + search)
  };

  //if(messageText.includes("roll a dice")){
    var dice = {
      sides: 6,
      roll: function () {
        var randomNumber = Math.floor(Math.random() * this.sides) + 1;
        return randomNumber;
      }
    }
    var result = dice.roll();
//    message.channel.reply("A" + result + "was rolled!")
//  }
});



//Music loool
client.on('message', async msg => { 
	if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(config.prefix)) return undefined;
    
    const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
    
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(config.prefix.length)

	if (command === `play`) {
		const voiceChannel = msg.member.voiceChannel;
        
        if (!voiceChannel) return msg.channel.send("I can't find you in any voice channel!");
        
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        
        if (!permissions.has('CONNECT')) {

			return msg.channel.send("I don't have enough permissions to join your voice channel!");
        }
        
		if (!permissions.has('SPEAK')) {

			return msg.channel.send("I don't have enough permissions to speak in your voice channel!");
		}

		if (!permissions.has('EMBED_LINKS')) {

			return msg.channel.sendMessage("I don't have enough permissions to insert a URLs!")
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {

			const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            

			for (const video of Object.values(videos)) {
                
                const video2 = await youtube.getVideoByID(video.id); 
                await handleVideo(video2, msg, voiceChannel, true); 
            }
			return msg.channel.send(`**${playlist.title}**, Just added to the queue!`);
		} else {

			try {

                var video = await youtube.getVideo(url);
                
			} catch (error) {
				try {

					var videos = await youtube.searchVideos(searchString, 5);
					let index = 0;
                    const embed1 = new Discord.RichEmbed()
                    .setTitle(":mag_right:  YouTube Search Results :")
                    .setDescription(`
                    ${videos.map(video2 => `${++index}. **${video2.title}**`).join('\n')}`)
                    
					.setColor("#f7abab")
					msg.channel.sendEmbed(embed1).then(message =>{message.delete(20000)})
					
/////////////////					
					try {

						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 15000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No one respone a number!!');
                    }
                    
					const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    
				} catch (err) {

					console.error(err);
					return msg.channel.send("I didn't find any results!");
				}
			}

            return handleVideo(video, msg, voiceChannel);
            
        }
        
	} else if (command === `skip`) {

		if (!msg.member.voiceChannel) return msg.channel.send("You Must be in a Voice channel to Run the Music commands!");
        if (!serverQueue) return msg.channel.send("There is no Queue to skip!!");

		serverQueue.connection.dispatcher.end('Ok, skipped!');
        return undefined;
        
	} else if (command === `stop`) {

		if (!msg.member.voiceChannel) return msg.channel.send("You Must be in a Voice channel to Run the Music commands!");
        if (!serverQueue) return msg.channel.send("There is no Queue to stop!!");
        
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Ok, stopped & disconnected from your Voice channel');
        return undefined;
        
	} else if (command === `vol`) {

		if (!msg.member.voiceChannel) return msg.channel.send("You Must be in a Voice channel to Run the Music commands!");
		if (!serverQueue) return msg.channel.send('You only can use this command while music is playing!');
        if (!args[1]) return msg.channel.send(`The bot volume is **${serverQueue.volume}**`);
        
		serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);
        
        return msg.channel.send(`Volume Now is **${args[1]}**`);

	} else if (command === `np`) {

		if (!serverQueue) return msg.channel.send('There is no Queue!');
		const embedNP = new Discord.RichEmbed()
	    .setDescription(`Now playing **${serverQueue.songs[0].title}**`)
        return msg.channel.sendEmbed(embedNP);
        
	} else if (command === `queue`) {
		
		if (!serverQueue) return msg.channel.send('There is no Queue!!');
		let index = 0;
//	//	//
		const embedqu = new Discord.RichEmbed()
        .setTitle("The Queue Songs :")
        .setDescription(`
        ${serverQueue.songs.map(song => `${++index}. **${song.title}**`).join('\n')}
**Now playing :** **${serverQueue.songs[0].title}**`)
        .setColor("#f7abab")
		return msg.channel.sendEmbed(embedqu);
	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('Ok, paused');
		}
		return msg.channel.send('There is no Queue to Pause!');
	} else if (command === "resume") {

		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
            return msg.channel.send('Ok, resumed!');
            
		}
		return msg.channel.send('Queue is empty!');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	

	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}!`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`Can't join this channel: ${error}!`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`**${song.title}**, just added to the queue! `);
	} 
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`**${song.title}**, is now playing!`);
}