const mongoose = require( 'mongoose' );

module.exports = 
{
    name: 'ready',
    once: true,
    async execute()
    {
        console.log( 'online!' );


        //
        // setup db
        //
        await mongoose.connect( process.env.DB_TOKEN, { keepAlive: true } )
    },
};