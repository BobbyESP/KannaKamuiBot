const Discord = require("discord.js")
const { get } = require("request-promise-native");

module.exports = {
    commands: 'anime',
    callback: (message, args, client, user) => {
        if (!args.length) {
            return message.channel.send("Please Specify An Anime.")
        }
        let option = {
            url: `https://kitsu.io/api/edge/anime?filter[text]=${args.join(" ")}`,
            method: `GET`,
            headers: {
                'Content-Type': "application/vnd.api+json",
                'Accept': "application/vnd.api+json"
            },
            json: true
        }

        message.channel.send("Fetching The Info").then(msg => {
            get(option).then(body => {
                try {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(body.data[0].attributes.titles.en)
                        .setColor("RED")
                        .setDescription(body.data[0].attributes.synopsis)
                        .setThumbnail(body.data[0].attributes.posterImage.original)
                        .addField("Ratings", body.data[0].attributes.averageRating)
                        .addField("TOTAL EPISODES", body.data[0].attributes.episodeCount)
                        .setImage(body.data[0].attributes.coverImage.large)
                        .setFooter("Bot Made By OblivionGhoul#5842", "https://i.imgur.com/Ivtf7GP.png")
                    message.channel.send(embed)
                    msg.delete();

                } catch (err) {
                    msg.delete();
                    return message.channel.send("Unable To Find Anime.");
                }
            }
            )
        })
    },
}