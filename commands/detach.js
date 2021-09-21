const { SlashCommandBuilder } = require('@discordjs/builders');
const server = require('../server.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('detach')
        .setDescription('指定したスロットのユーザー割当を解除します。')
        .addNumberOption(option => option
            .setName('slot')
            .setDescription('セット解除する場所を1～5で選択します。')
            .setRequired(true)
        ),
    async execute(interaction) {
        const setNumber = interaction.options.getNumber('slot');

        if (server.getStatus() == server.VOTING) {
            interaction.reply('このコマンドは投票中は実行できません。');
        } else if ((setNumber >= 1) && (setNumber <= server.MAX_USER_NUM)) {
            interaction.reply('スロットは1から' + server.MAX_USER_NUM.toString() + 'の間で指定する必要があります。');
        } else {
            server.detachUser(setNumber - 1);
            server.hideUser(setNumber - 1);

            interaction.reply(setNumber.toString() + '番スロットの割当を解除しました。');
        }
    },
}