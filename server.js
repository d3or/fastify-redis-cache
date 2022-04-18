// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const cache = require('./cache.js')

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})


// Replies after 5 seconds
fastify.get('/test', (request, reply) => {
    setTimeout(() => {
        reply.send({ hello: 'world' })
    }, 5000)    
})
  
// Register the plugin
fastify.register(cache)

// Run the server!
fastify.listen(3000, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})