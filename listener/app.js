const net = require('net');
const crypto = require('crypto');
require('dotenv').config();

const SECRET_KEY = "some_secret_key123!@";

const decrypt = (encryptedText) => {
    try {
        const key = crypto.createHash('sha256').update(SECRET_KEY).digest();
        const iv = Buffer.from(encryptedText.slice(0, 32), "hex"); 
        const content = encryptedText.slice(32);
        const decipher = crypto.createDecipheriv("aes-256-ctr", key, iv);
        let decrypted = decipher.update(content, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    } catch (err) {
        console.log(`Decrypt Err: ${err.message}`);
        return null;
    }
};

const validateMessage = (message) => {
    try {
        const { name, origin, destination, secret_key } = message;
        const originalMessage = {
            name,
            origin,
            destination
        };
        const generatedHash = crypto.createHash("sha256").update(JSON.stringify(originalMessage)).digest("hex");
        return generatedHash === secret_key;
    } catch {
        return false;
    }
};

const server = net.createServer((socket) => {
    console.log('Emitter connected');

    socket.on('data', (data) => {
        try {
            const stream = data.toString();
            const messages = stream.split('|');
            console.log(`Length: ${messages.length}`);

            messages.forEach((msg, index) => {
                /*try {
                    const obj = JSON.parse(msg);
                    console.log(`Message ${index + 1}:`, obj);
                }catch(err) {
                    console.log(`JSON messages Error!!`);
                }*/
                
                if (!msg) return;

                const decrypted = decrypt(msg);
                if (!decrypted) {
                    console.log(`Decryption failed: ${index + 1}`);
                    return;
                }

                let obj;

                try {
                    obj = JSON.parse(decrypted);
                } catch (err) {
                    console.log(`Invalid JSON: ${index + 1}`);
                    return;
                }

                const isValid = validateMessage(obj);
                if (!isValid) {
                    console.log(`Integrity check failed: ${index + 1}`);
                    return;
                }

                console.log(`Valid Message ${index + 1}:`, obj);
            });
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