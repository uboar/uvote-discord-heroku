const { SlashCommandBuilder } = require('@discordjs/builders');
const server = require('../server.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('attach')
        .setDescription('指定したユーザーをスロットに割り当てます。')
        .addNumberOption(option => option
            .setName('slot')
            .setDescription('セットする場所を1～5で選択します。')
            .setRequired(true)
        )
        .addUserOption(option => option
            .setName('user')
            .setDescription('セットするユーザーを選択します。')
            .setRequired(true)
        ),
    async execute(interaction) {
        const setNumber = interaction.options.getNumber('slot');
        const setUser = interaction.options.getUser('user');

        if (server.getStatus() == 1) {
            interaction.reply('このコマンドは投票中は開始できません。');
        } else if ((setNumber >= 1) && (setNumber <= server.MAX_USER_NUM)) {
            interaction.reply('スロットは1から' + server.MAX_USER_NUM.toString() + 'の間で指定する必要があります。');
        } else {
            server.modifyUserId(setUser.id, setNumber - 1);
            server.modifyUserName(setUser.username, setNumber - 1);
            server.modifyIcon(setUser.displayAvatarURL(), setNumber - 1);
            server.attachUser(setNumber - 1);
            server.showUser(setNumber - 1);

            interaction.reply(setNumber.toString() + '番スロットに <@' + setUser.id + '> さんを割当しました。');
        }
    },
}