const { SlashCommandBuilder } = require( 'discord.js' );

module.exports = 
{
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription( 'This is a test' )

    .addStringOption(option =>
        option.setName('input')
            .setDescription('The input to echo back')
            .setRequired(true)),

    async execute (interaction) 
    {
        const val = interaction.options.getString('input')
        console.log(interaction.options.getString('input'))

        return interaction.reply(`nigga: \`${val}\``)
    }
}