const { Client, Intents, Collection } = require( 'discord.js' );
require( 'dotenv' ).config();

const junkie = new Client( { intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ], } );

junkie.commands = new Collection();

[ 'command_handler', 'event_handler', 'refresh_commands' ].forEach( handler => 
{
    require( `./handlers/${ handler }` ) ( junkie, Client );
});


junkie.login( process.env.CLIENT_TOKEN );