class Utils {
    static setDefaultFooter(embed) {
        embed.setTimestamp();
        embed.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL());
    }
}
