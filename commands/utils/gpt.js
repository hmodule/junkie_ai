const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, SlashCommandBuilder, EmbedBuilder, codeBlock, PermissionsBitField } = require('discord.js');
const { OpenAIApi, Configuration } = require( 'openai' );


module.exports =
{
    data: new SlashCommandBuilder()
    .setName( 'gpt' )
    .setDescription( 'ask gpt anything!' )
    .addSubcommand
    ( 
        image_gen => image_gen
        .setName( 'image' )
        .setDescription( 'Generate a image' )
        .addStringOption
        ( 
            image => image
            .setName( 'image' )
            .setDescription( 'Image to generate?' )
            .setRequired( true )
        )
    )
    .addSubcommand
    (
        text_comp => text_comp
        .setName('text')
        .setDescription( 'Text completion' )
        .addStringOption
        (
            text => text
            .setName( 'text' )
            .setDescription( 'Text to complete' )
            .setRequired( true )
        )        
    ),
    

    async execute ( interaction )
    {
        const config = new Configuration({ organization: 'org-9gldGQBK5etpM1UxLZ7KiqgW', apiKey: process.env.OPENAI_API_KEY });

        async function text_comparison()
        {
            const q = interaction.options.getString( 'text' );
            interaction.deferReply({ content: `Working on: ${q}`, components: [] });

            try 
            {
                const openai = new OpenAIApi(config);
                const request = ({ "model": "text-davinci-003", "prompt": `${ q }`, "temperature": 0, "max_tokens": 7 });
                const response = await openai.createCompletion( request );
                // console.log( response.data.choices );


                const reply = codeBlock( response.data.choices[0].text )

                await interaction.editReply( {content: `${ reply }` } );
            }
            catch( e )
            {
                console.log( e );
                await interaction.editReply( 'Something failed! Please try again.' );
            }
        }


        async function image_generation()
        {
            const q = interaction.options.getString( 'image' );
            interaction.deferReply({ content: `Working on: ${q}`, components: [] });

            try 
            {
                const openai = new OpenAIApi(config);
                const request = ({ "prompt": `${ q }`, "n": 1, "size": "1024x1024", "response_format": "url" });
                const response = await openai.createImage( request );


                let img = response.data.data[0].url;
                const img_embed = new EmbedBuilder()
                .setTitle( 'Image Generator' )
                .setColor( 'Random' )
                .setImage( img )
                .setTimestamp()

                await interaction.editReply( {content: 'Here you go!', embeds: [img_embed] } );
            }
            catch( e )
            {
                console.log( e );
                await interaction.editReply( 'Something failed! Please try again.' );
            }
        }

        let interaction_type = interaction.options._subcommand === 'text' ? text_comparison() : image_generation();
    }
        
}