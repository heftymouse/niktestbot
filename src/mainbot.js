const Discord = require('discord.js');
const client = new Discord.Client();
const https = require('https');
const tcpp = require('tcp-ping');
const cfg = require('../config_example.json');

client.once('ready', () => {
    console.log('Ready!');
});

client.login(cfg.token);

client.on('message', message => {
    if (!message.content.startsWith(cfg.prefix) || message.author.bot) return;

    let args = message.content.slice(cfg.prefix.length).trim().split(/ +/);
    let command = args.shift().toLowerCase();
    if(command === 'bigsmoke') {
        message.channel.send("I'll have two number 9s, a number 9 large, a number 6 with extra dip, a number 7, two number 45s, one with cheese, and a large soda.");
    }

    else if(command === 'quit') {
        message.channel.send("Quitting...");
        function quit() {
            process.exit();
        }
        setTimeout(quit, 500);
    }

    else if(command === 'apod') {
        https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
        let data = '';
          
        resp.on('data', (chunk) => {
            data += chunk;
        });
          
        resp.on('end', () => {
            const apodEmbed = new Discord.MessageEmbed()
                .setColor("PURPLE")
                .setTitle('NASA Astronomy Picture of the Day')
                .setImage(JSON.parse(data).url)
                .addField(JSON.parse(data).title, JSON.parse(data).explanation)
                .addField('Link to HD image', JSON.parse(data).hdurl)
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL());
            message.channel.send({embed: apodEmbed}); 
        });
          
        }).on("error", (err) => {
            message.channel.send("Error: " + err.message);
        });
    }

    else if(command === 'youtube') {
        message.channel.send('This is a WIP and isn\'t complete at the moment.\nAlso get stickbugged lol');
    }

    else if(command === 'ping') {
        tcpp.probe(args[0], 80, function(err, available) {
            console.log(available);
        });

        if(args[0] && (!args[1] || args[1] <= 30)) {
            tcpp.ping({ address: args[0], attempts: parseInt(args[1]), timeout: parseInt(args[2])}, function(err, data) {
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
                    .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL());
                
                message.channel.send({embed: pingEmbed});
            });
        }
    }

    else if(command === 'package') {
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
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL());
            message.channel.send({embed: packageEmbed}); 
        });

        }).on("error", (err) => {
            message.channel.send("Error: " + err.message);
    }); 

    }
});