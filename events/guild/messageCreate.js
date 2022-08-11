const user = require( '../../schemas/user' );

module.exports =
{
    name: 'messageCreate',
    async execute( message )
    {
        console.log( message.id );

        const init_user = await user.create
        (
            {
                username: message.author.username,
                discord_id: message.author.id,
                avatar: message.authour.avatarURL,
                created_at: message.author.createdAt
            }
        );

        // const saved_user = await init_user.save();
    },
};