const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  message.channel.send("Hello, World!").then(m => m.delete(10000))
}
//name this whatever the command name is.
module.exports.help = {
  name: "hello"
}