const Discord = require('discord.js');
const tcpp = require('tcp-ping');
const cfg = require(__dirname + '/../cfg/config.json');

module.exports.exec = (msg, args) => {
    msg.channel.send(`Latency to bot is **${Date.now() - msg.createdTimestamp}**`)
};