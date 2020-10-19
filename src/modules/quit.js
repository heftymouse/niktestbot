const Discord = require('discord.js');
const cfg = require(__dirname + '/../cfg/config.json');

export const needsArgs = false;
export function exec(msg) {
    let role = msg.guild.roles.cache.find(r => r.name === cfg.op_role);
    if (msg.member.roles.cache.has(role.id)) {
        msg.channel.send('Quitting...');
        function quit() {
            process.exit();
        }
        setTimeout(quit, 300);
    }
    else {
        msg.channel.send('You have insufficient permissions to do this.');
    }
}