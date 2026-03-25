const net = require('net');

const server = net.createServer((socket) => {
    console.log('Emitter connected');

    socket.on('data', (data) => {
        try {
            const stream = data.toString();
            const messages = stream.split('|');
            console.log(`Length: ${messages.length}`);

            messages.forEach((msg, index) => {
                try {
                    const obj = JSON.parse(msg);
                    console.log(`Message ${index + 1}:`, obj);
                }catch(err) {
                    console.log(`JSON messages Error!!`);
                }
            })
        }catch(err) {
            console.log(`Process Err: ${err.message}`);
        }
    });

    socket.on('error', (err) => {
        console.log(`Socket Error: ${err.message}`);
    });

    socket.on('close', () => {
        console.log('Connection closed!!');
    });
});

server.listen(4000, () => {
    console.log('Listener running on port 4000');
});