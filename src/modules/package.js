const Discord = require('discord.js');
const https = require('https');
const cfg = require(__dirname + '/../cfg/config.json');

module.exports.exec = (msg, args) => {
    https.get(`https://libraries.io/api/${args[0]}/${args[1]}?api_key=${cfg.libio_api_key}`, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            let res = JSON.parse(data);
            const packageEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle('Package Search Results')
                .addFields(
                    {name: 'Package name', value: `${res.name}` },
                    {name: 'Language', value: `${res.language} (${res.platform})`},
                    {name: 'Licenses', value: `${res.licenses}`, inline:true},
                    {name: 'Latest version', value: `${res.latest_stable_release_number}`, inline:true },
                    {name: 'Description', value: `${res.description}` },
                    {name: 'Project Homepage', value: `${res.homepage}` },
                    {name: 'Package Manager Page', value: `${res.package_manager_url}` },
                )
                .setTimestamp()
                .setFooter(`Requested by ${msg.author.username}`, msg.author.avatarURL());
            msg.channel.send({embed: packageEmbed}); 
        });

        }).on("error", (err) => {
            msg.channel.send("Error: " + err.msg);
    }); 
};