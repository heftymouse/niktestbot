const Discord = require('discord.js');
const tcpp = require('tcp-ping');
const cfg = require(__dirname + '/../cfg/config.json');

module.exports.exec = (msg, args) => {
    tcpp.probe(args[0], 80, function(err, available) {
        console.log(available);
    });

    if(args[0] && (!args[1] || args[1] <= cfg.ping_max_attempts)) {
        tcpp.ping({ address: args[0], attempts: parseInt(args[1]), timeout: parseInt(args[2]), port: 80}, function(err, data) {
            let pingEmbed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('Ping Results')
                .addFields(
                    {name: 'Server', value: data.address, inline: true },
                    {name: 'Port', value: data.port, inline: true },
                    {name: 'Attempts', value: data.attempts, inline: true },
                    {name: 'Average', value: data.avg.toFixed(3), inline: true },
                    {name: 'Maximum', value: data.max.toFixed(3), inline: true },
                    {name: 'Minimum', value: data.min.toFixed(3), inline: true },
                )
                .setTimestamp()
                .setFooter(`Requested by ${msg.author.username}`, msg.author.avatarURL());
            
            msg.channel.send({embed: pingEmbed});
        });
    }
};