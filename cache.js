
const Redis = require('ioredis')
const redis = new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host 
    // password: '' // Redis password (optional)
    // family: 4, // 4 (IPv4) or 6 (IPv6)
    // db: 0, // Database index to use
})

const fp = require('fastify-plugin');

async function cache(fastify, _options, next) {
    fastify.addHook('onRequest', (req, reply, done) => {
        // if (reply.getHeader('x-cache-bypass') === 'true') {
        //     return done();
        // }

        let key = req.routerPath;
        redis.get(key, (err, val) => {
            if (!err && val) {
                const cachedData = JSON.parse(val);
                reply.header('x-cache', 'HIT')
                reply.type('application/json')
                reply.send(cachedData)
                return;
            } 
            // If there is no cached data, then we just proceed with the request
            reply.header('x-cache', 'MISS')
            done()
        })
    })

    fastify.addHook('onSend', function (req, reply, payload, next) {
        if (reply.getHeader('x-cache') === 'HIT') {
            next();
            return;
        }

        let key = req.routerPath;
        redis.set(key, payload, 'ex', 5);
        next()
    })

    next()
}

module.exports = fp(cache)