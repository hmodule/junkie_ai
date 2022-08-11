const { REST } = require( '@discordjs/rest' );
const { Routes } = require( 'discord-api-types/v9' );
require( 'dotenv' ).config()
const fs = require( 'fs' );

module.exports = ( junkie, Client ) =>
{
    const commands = [];
    CLIENT_ID = '1007100707243044936';
    GUILD_ID = '888552869408686080';

    const command_folders = fs.readdirSync( './commands' );

    for ( const folder of command_folders )
    {
        const command_files = fs.readdirSync( `./commands/${ folder }` ).filter( file => file.endsWith( '.js' ) );

        for ( const file of command_files )
        {
            const command = require( `../commands/${ folder }/${ file }` );
            commands.push( command.data.toJSON() );
        };
    };

    const rest = new REST( { version: '9' } ).setToken( process.env.CLIENT_TOKEN );

    ( async () => 
    {
        try
        {
            console.log( 'started refreshing application (/) commands' );

            await rest.put( Routes.applicationGuildCommands( CLIENT_ID, GUILD_ID  ), { body: commands }, );

            console.log( 'successfully reloaded application (/) commands' );
        }
        catch ( error )
        {
            console.error( error );
        }

    })();
};
