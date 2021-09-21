const fs = require('fs');
const server = require('./server.js');

const {
    Client,
    Collection,
    Intents,
} = require('discord.js');

const options = {
    intents: [Intents.FLAGS.GUILDS]
};

const client = new Client(options);

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    //console.log(`${client.user.tag} でログインしています。`);
    server.servStart();
});

client.on('interactionCreate', async interaction => {

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'なんかエラー出たっぽいですね…' });
    }
})

client.login();