const crypto = require('crypto');
const data = require('../config/data.json');

const SECRET_KEY = "some_secret_key123!@";

function generateMessages() {
    try {
        const messages = [];
        const count = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

        const aesKey = crypto.createHash("sha256").update(SECRET_KEY).digest();

        for (let i = 0; i < count; i++) {

            const name = getRandomElement(data.names);
            const origin = getRandomElement(data.cities);
            const destination = getRandomElement(data.cities);

            const originalMessage = { name, origin, destination };

            const secret_key = crypto.createHash("sha256").update(JSON.stringify(originalMessage)).digest("hex");

            const payload = {
                ...originalMessage,
                secret_key
            };

            const hash = crypto.randomBytes(16);

            const cipher = crypto.createCipheriv("aes-256-ctr", aesKey, hash);

            const encrypted = Buffer.concat([
                cipher.update(JSON.stringify(payload)),
                cipher.final()
            ]);

            messages.push(hash.toString("hex") + encrypted.toString("hex"));
        }

        return messages;

    } catch (err) {
        console.log(`Message Err: ${err.message}`);
        return [];
    }
}

module.exports = {generateMessages};

function getRandomElement(arr) {
    try {
        return arr[Math.floor(Math.random() * arr.length)];
    } catch (err) {
        console.log(`RandomElement Error: ${err.message}`);
        return null;
    }
}