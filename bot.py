import discord
from discord.ext import commands

client = commands.Bot(command_prefix= "sh!")

@client.event
async def on_ready():
    