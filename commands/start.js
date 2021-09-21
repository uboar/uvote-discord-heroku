const { SlashCommandBuilder } = require('@discordjs/builders');
const server = require('../server.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('投票を開始します。'),
    async execute(interaction) {

        if (server.getStatus() != 1) {
            server.startVote();
            interaction.reply('開始しました。');
        } else {
            interaction.reply('既に投票が開始されています。');
        }
    },
}