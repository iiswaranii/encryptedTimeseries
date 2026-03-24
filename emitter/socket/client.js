const net = require('net');

function startClient() {
    const client = new net.Socket();
    try {
        client.connect(4000, 'localhost', () => {
            console.log('Connected to Listener!!');

            setInterval(() => {
                try {
                    const msg = "This is a test message...";

                    client.write(msg);
                    
                    console.log(`Message sent: ${msg}`);
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