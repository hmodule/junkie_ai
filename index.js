const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
require( 'dotenv' ).config();


const junkie = new Client( { intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] } );

junkie.commands = new Collection();

[ 'command_handler', 'event_handler', 'refresh_commands' ].forEach( handler => 
{
    require( `./handlers/${ handler }` ) ( junkie, Client );
});


const AutoGitUpdate = require('auto-git-update');

const config = 
{
    repository: 'https://github.com/hmodule/junkie_ai',
    fromReleases: false,
    tempLocation: '/Users/kylehouk/Desktop/projects/junkie_ai',
    ignoreFiles: ['util/config.js'],
    executeOnComplete: 'NULL',
    exitOnComplete: true
};

const updater = new AutoGitUpdate( config );

updater.autoUpdate();


junkie.login( process.env.CLIENT_TOKEN );