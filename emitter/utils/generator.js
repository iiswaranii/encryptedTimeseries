function generateMessages() {
    try {
        const messages = [];
        const count = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

        for (let i = 0; i < count; i++) {
            messages.push(`msg_${i+1}`);
        }
        return messages;
    } catch (err) {
        console.log(`Message Err: ${err.message}`);
        return [];
    }
}

module.exports = {generateMessages};