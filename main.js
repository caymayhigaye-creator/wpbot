const {Client, LocalAuth} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const {commands, prefix, Active} = require('./commands.js');
require('dotenv/config.js');


const client = new Client();

const init = async () => {
    client.on('qr', async (qr) => {
        console.log('qr code received');
        qrcode.generate(qr, {small: true});
    });

    client.on('ready', async () => {
        console.log('Client ready!')
    });

    client.on('message_create', async (msg) => {
        if (Active) {
            const [cmd, ...argumentz] = msg.body.split(' ');
            const c = commands.find(c => c.name === (cmd.toLowerCase().startsWith(prefix)) ? cmd.toLowerCase().slice(1, cmd.length) : cmd);
            if(!cmd || !c)return('command not found');

            if (cmd.toLowerCase().startsWith(prefix) && cmd == prefix+c.name) {
                console.log('executing', c.name);
                await(c).execute(client, msg, argumentz);
            } else {
                console.log('command did not found')
            };
        } else {
            return;
        };
    });

    client.on('disconnected', async () => {
        console.log('client disconnected');
    });

    await client.initialize();
};

init();