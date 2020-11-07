const fs = require('fs');
const cfg = require('./cfg/config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const commands = new Map();
const files = fs.readdirSync('./src/modules').filter(file => file.endsWith('.js'));

files.forEach((file) => {
    const command = require(`./modules/${file}`);
    commands.set(file.substring(0, file.length - 3), command);
});

client.once('ready', () => {
    console.log('Ready!');
});

client.login(cfg.token);

client.on('message', message => {
    if (!message.content.startsWith(cfg.prefix) || message.author.bot) return;

    let args = message.content.slice(cfg.prefix.length).trim().split(/ +/);
    let commandName = args.shift().toLowerCase();

    console.log(`Command \'${commandName}\' sent by ${message.author.username}. Args: ${args}`);
    commands.get(commandName).exec(message, args);
});