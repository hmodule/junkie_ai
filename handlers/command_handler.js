const fs = require( 'fs' );

module.exports = ( junkie ) =>
{
    const command_folders = fs.readdirSync( './commands' );

    for ( const folder of command_folders )
    {
        const command_files = fs.readdirSync( `./commands/${ folder }` ).filter( file => file.endsWith( '.js' ) );

        for ( const file of command_files )
        {
            let command = require( `../commands/${ folder }/${ file }` );
            junkie.commands.set( command.data.name, command );
            console.log( `loaded ${ command.data.name }` )
        };
    };
};