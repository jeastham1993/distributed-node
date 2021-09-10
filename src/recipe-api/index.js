const server = require('fastify')();
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;

console.log(`worker pid=${process.pid}`);

server.get('/recipes/:id', async (req, reply) => {
    console.log(`worker request=${process.pid}`);
    const id = Number(req.params.id);

    if (id !== 42) {
        reply.statusCode = 404;
        return { error: 'not_found' };
    }

    return {
        producer_pid: process.pid,
        recipe: {
            id, name: 'Tofu Tikka Masala',
            steps: 'Throw it all in a pot...',
            ingredients: [
                { id: 1, name: 'Tofu', quantity: '400g' },
                { id: 2, name: 'Sauce', quantity: '400g' }
            ]
        }
    }
})

server.listen(PORT, HOST, () => {
    console.log(`Producer running at http://${HOST}:${PORT}`);
})