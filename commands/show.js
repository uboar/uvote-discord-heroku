const { SlashCommandBuilder } = require('@discordjs/builders');
const server = require('../server.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('show')
        .setDescription('結果を表示します。'),
    async execute(interaction) {

        if (server.getStatus() == 1) {
            server.endVote(3);
            interaction.reply('結果を反映しました。');
        } else {
            interaction.reply('投票が開始されていません。 voteコマンドを使用して投票を開始してください。');
        }
    },
}