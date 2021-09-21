const { SlashCommandBuilder } = require('@discordjs/builders');
const server = require('../server.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('現在の状態を表示します。'),
    async execute(interaction) {
        switch (server.getStatus()) {
            case 0:
                interaction.reply("アイドル状態です。");
                break;
            case 1:
                interaction.reply("投票中です。");
                break;
            case 2:
                interaction.reply("結果を表示しています。");
                break;
            default:
                interaction.reply("わからん…");
                break;
        }
    },
}