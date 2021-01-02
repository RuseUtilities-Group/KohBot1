const Discord = require("discord.js")
const config = require("./config.json")
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} command has loaded.`);
  client.commands.set(props.help.name, props);
});

});


client.on("ready", () => {
    console.log(`KohBot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    client.user.setActivity("I was testing");
  
  });
  
  client.on('ready', () => {
      // List servers the bot is connected to
      console.log("Servers:")
      client.guilds.forEach((guild) => {
          console.log(" - " + guild.name)
      })
  })
   

client.on("message", async message => {
  //a little bit of data parsing/general checks
  if(message.author.client) return;
  if(message.channel.type === 'dm') return;
  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);
  let prefix = config.prefix;


  //checks if message contains a command and runs it
  let commandfile = client.commands.get(command.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args);
  if(!commandfile) message.channel.reply("That command does not exist!")
})


client.login(process.env.token);