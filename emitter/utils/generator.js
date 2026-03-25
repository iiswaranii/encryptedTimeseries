const crypto = require('crypto');
const data = require('../config/data.json');

function generateMessages() {
    try {
        const messages = [];
        const count = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

        for (let i = 0; i < count; i++) {

            const name = getRandomElement(data.names);
            const origin = getRandomElement(data.cities);
            const destination = getRandomElement(data.cities);
            const createdString = `${name}_${origin}_${destination}_${Date.now()}`;
            const secretKey = crypto.createHash("sha256").update(createdString).digest("hex");

            const message = {
                name,
                origin,
                destination,
                secretKey
            };

            messages.push(JSON.stringify(message));
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