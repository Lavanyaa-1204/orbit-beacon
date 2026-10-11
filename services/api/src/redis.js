const { createClient } = require('redis');
const config = require('./config');

const client = createClient({ url: config.redisUrl });
client.on('error', (e) => console.log('redis error', e.message));

module.exports = client;
