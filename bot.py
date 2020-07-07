import discord
from discord.ext import commands

client = commands.Bot(command_prefix= "sh!")

@client.event
async def on_ready():
    print("Bot has been activated...")

client.run("NzMwMDA0MTAzNzE5Mjg4OTA0.XwRPMA.frIWsNOKAoVgzOM7NbfZDCcOypA")
