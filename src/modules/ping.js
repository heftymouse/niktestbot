const Discord = require('discord.js');
const tcpp = require('tcp-ping');
const cfg = require(__dirname + '/../cfg/config.json');

module.exports.exec = (msg, args, client) => {
    msg.channel.send(`Client latency to Bot is **${Date.now() - msg.createdTimestamp} ms**`);
    msg.channel.send(`Bot latency to Discord is **${client.ws.ping} ms**`)
};