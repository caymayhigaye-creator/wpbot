const prefix = "/";
let Active = true;

const commands = [
    {
        name: 'spam_message',

        async execute(client, msg, argumentz) {
            Active = false;

            const [range, ...messages] = argumentz;
            const message = messages.join(' ');


            if(!client || !msg){return(console.log('Client or msg not found!'))};
            if (!msg || !range){return(msg.reply('wrong arguments'))};
            
            try {
                for (let i=0; i<range; i++) {
                    msg.reply(message);
                }
                Active = true;
            } catch (e) {
                console.log(e.message);
                Active = true;
            }
        },
    }
];

module.exports = {commands, prefix, Active};