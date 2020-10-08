const Discord = require('discord.js');
const https = require('https');
const path = require('path');
const cfg = require(__dirname + '/../cfg/config.json');

module.exports = {
    needsArgs: false,
    exec(msg, args) {
        https.get(`https://api.nasa.gov/planetary/apod?api_key=${cfg.apod_api_key}`, (resp) => {
        let data = '';
            
        resp.on('data', (chunk) => {
            data += chunk;
        });
    
        resp.on('end', () => {
            try {
                let res = JSON.parse(data);
                if(res.explanation.length > 1024) {
                    res.explanation = res.explanation.substring(0, 1020).substring(0, res.explanation.lastIndexOf(' ')) + '...';
                }
                const apodEmbed = new Discord.MessageEmbed()
                    .setColor("PURPLE")
                    .setTitle('NASA Astronomy Picture of the Day')
                    .setURL('https://apod.nasa.gov/apod/astropix.html')
                    .setImage(res.url)
                    .addField(res.title, res.explanation)
                    .addField('Link to HD image', res.hdurl)
                    .setTimestamp()
                    .setFooter(`Requested by ${msg.author.username}`, msg.author.avatarURL());
                msg.channel.send({embed: apodEmbed}); 
            }
            catch {
                msg.channel.send('Something went wrong, check the log for more details');
            }
        });
    
        }).on("error", (err) => {
            msg.channel.send("Error: " + err.msg);
        });
    },
}