const fs = require( 'fs' );

module.exports = ( junkie, Client ) =>
{ 
    const load_dir = ( dirs ) =>
    {
        const event_files = fs.readdirSync( `./events/${ dirs }` ).filter( file => file.endsWith( '.js' ) );

        for ( const file of event_files )
        {
            const event = require( `../events/${ dirs }/${ file }` );

            if ( event.once )
            {
                junkie.once( event.name, ( ...args ) => event.execute( ...args ) );
                console.log( `loaded event once: ${ event.name }` );
            }
            else
            {
                junkie.on( event.name, ( ...args ) => event.execute( ...args ) );
                console.log( `loaded event: ${ event.name }` );
            }
        };
    

    }

    [ 'client', 'guild' ].forEach( e => load_dir( e ) );
};