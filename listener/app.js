const net = require('net');

const server = net.createServer((socket) => {
    console.log('Emitter connected');

    socket.on('data', (data) => {
        console.log(`Received: ${data.toString()}`);
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