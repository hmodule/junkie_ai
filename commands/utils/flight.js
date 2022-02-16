const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { MessageEmbed } = require( 'discord.js' );
const wait = require( 'util' ).promisify( setTimeout );
const Amadeus = require( 'amadeus' );

const a = new Amadeus
({ 
    clientId: `${ process.env.clientId }`,
    clientSecret: `${ process.env.clientSecret }`
});


module.exports =
{
    data: new SlashCommandBuilder()
    .setName( 'flight' )
    .setDescription( 'pulls data from nasa API' )

    .addStringOption( option => 
        option.setName( 'loc_code' ) 
        .setDescription( 'Country location code' )
        .setRequired( true ) )

    .addStringOption( option_1 => 
        option_1.setName( 'des_code' ) 
        .setDescription( 'Country destination code' )
        .setRequired( true ) )

    .addStringOption( option_2 => 
        option_2.setName( 'dep_date' ) 
        .setDescription( 'The departure date' )
        .setRequired( true ) )

    .addStringOption( option_3 => 
        option_3.setName( 'num_of_adults' ) 
        .setDescription( 'The amount of adults' )
        .setRequired( true ) ),



    async execute( interaction )
    {
        // wait for the data to be fetched ( junkie is thinking... )
        await interaction.deferReply();
		await wait( 2000 );


        // these are the values we pull from each string option, very bad practice.
        //TODO: figure out why we aren't able to use CAPS in getString()
        const val = interaction.options.getString( 'loc_code' );
        const val_1 = interaction.options.getString( 'des_code' );
        const val_2 = interaction.options.getString( 'dep_date' );
        const val_3 = interaction.options.getString( 'num_of_adults' );

    
        // fetch the flight data, we should return a promise, for now its fine
        const res = await a.shopping.flightOffersSearch.get
        ({ 
            originLocationCode: `${ val }`, 
            destinationLocationCode: `${ val_1 }`, 
            departureDate: `${ val_2 }`, 
            adults: `${ val_3 }` 
        });


        // make it look pretty, what else needs to be said?
        const flight_embed = new MessageEmbed()
        .setColor( 0xff0000 )
        .setTitle( `${ res.data[ 0 ].type }` )
        .addField( 'One way?', `\`${ res.data[ 0 ].oneWay }\`` )
        .addField( 'Total Seats Bookable', `\`${ res.data[ 0 ].numberOfBookableSeats }\`` )
        .addField( 'Currency', `\`${ res.data[ 0 ].price.currency }\`` )
        .addField( 'Total', `\`${ res.data[ 0 ].price.total }\`` )
        .addField( 'Base', `\`${ res.data[ 0 ].price.base }\`` )
        

        // finally, we edit the original reply with the live data
		await interaction.editReply( { embeds: [ flight_embed ] } );
    },

};