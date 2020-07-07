const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");


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


client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
  if (!channel) return;
  channel.send(`Welcome to this server, ${member}`);
});

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return
    }
    if (receivedMessage.content.includes(client.user.toString())) {
        receivedMessage.channel.send("AI Loading...")
    }
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

if(command === "") {
   
  }

});