const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
require( 'dotenv' ).config();


const junkie = new Client( { intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] } );

junkie.commands = new Collection();

[ 'command_handler', 'event_handler', 'refresh_commands' ].forEach( handler => 
{
    require( `./handlers/${ handler }` ) ( junkie, Client );
});


junkie.login( process.env.CLIENT_TOKEN );