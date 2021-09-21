const { SlashCommandBuilder } = require('@discordjs/builders');
const server = require('../server.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('投票します。')
        .addNumberOption(option => option
            .setName('point')
            .setDescription('点数を記入します。')
            .setRequired(true)
        ),
    async execute(interaction) {
        const pointNum = interaction.options.getNumber('point');
        var slot;

        if (server.getStatus() == 1) {
            slot = server.getUserSlot(interaction.user.id);
            if(slot == -1){
                interaction.reply('あなたはメンバーに入っていないようです。');
            }else{
                server.modifyPoint(pointNum, slot);
                if(server.getAllUserVoted() == true){
                    interaction.reply(pointNum.toString() + '点を入れました。全員の投票が終了しました。showコマンドを使用して結果を見る事が出来ます。');
                }else{
                    interaction.reply(pointNum.toString() + '点を入れました。');
                }
            }
        } else {
            interaction.reply('投票が開始されていません。 startコマンドを使用して投票を開始してください。');
        }
    },
}