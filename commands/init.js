const { SlashCommandBuilder } = require('@discordjs/builders');
const server = require('../server.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('init')
        .setDescription('もろもろの設定を初期化します。'),
        
    async execute(interaction) {
        server.setIdle();
        for (var i = 0; i < server.MAX_USER_NUM; i++) {
            server.detachUser(i);
            server.hideUser(i);
        }
        server.showUser(0);
        interaction.reply('初期化が終わりました。');
    },
}