const mongoose = require( 'mongoose' );

const user_schema = new mongoose.Schema
({
    username: mongoose.SchemaTypes.String,
    discord_id: { type: mongoose.SchemaTypes.String, required: true },
    avatar: mongoose.SchemaTypes.String,
    created_at: mongoose.SchemaTypes.Date,
});

module.exports = mongoose.model( 'user', user_schema );
