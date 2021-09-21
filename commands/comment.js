const { SlashCommandBuilder } = require('@discordjs/builders');
const server = require('../server.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comment')
        .setDescription('コメントを記入します。')
        .addStringOption(option => option
            .setName('string')
            .setDescription('表示する一言コメントです。')
            .setRequired(true)
        ),
    async execute(interaction) {
        const commentStr = interaction.options.getString('string');
        var slot;

        slot = server.getUserSlot(interaction.user.id);
        if (slot == -1) {
            interaction.reply('あなたはメンバーに入っていないようです。');
        } else {
            server.modifyComment(commentStr, slot);
            interaction.reply('一言コメントを設定しました。');
        }
    },
}