const net = require('net');
const { generateMessages } = require('../utils/generator');

function startClient() {
    const client = new net.Socket();
    try {
        client.connect(4000, 'localhost', () => {
            console.log('Connected to Listener!!');

            setInterval(() => {
                try {
                    const msgs = generateMessages();
                    const stream = msgs.join('|');
                    client.write(stream);
                    
                    console.log(`Message sent: ${stream}`);
                } catch(err) {
                    console.log(`Emitter Error: ${err.message}`);
                }
            }, 5000);
        })

        client.on('error', (err) => {
            console.log(`Socket Error: ${err.message}`);
        });

        client.on('close', () => {
            console.log('Connection closed!!')
        })
    } catch(err) {
        console.log(`Main: ${err.message}`);
    }
}

module.exports = {startClient};