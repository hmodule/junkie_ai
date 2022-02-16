module.exports =
{
    name: 'interactionCreate',
    async execute( interaction )
    {
        if ( !interaction.client.commands.has( interaction.commandName ) ) return;

        try
        {
            await interaction.client.commands.get( interaction.commandName ).execute( interaction );
            console.log( `${ interaction.user.tag } executed ${ interaction.commandName } in ${ interaction.channel.name }` );
        }
        catch ( e )
        {
            console.error( e );
            await interaction.reply( { content: `failed to exec \`${ interaction.commandName }\``, ephemeral: true } );
        }
    }
}