import 'fastify';
import fetch from 'node-fetch';
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || 'localhost:4000';

let server = new fastify();

console.log(`worker pid=${process.pid}`);

server.get('/', async () => {
    const req = await fetch(`http://${TARGET}/recipes/42`);
    console.log(req);
    const producer_data = await req.json();

    return {
        consumer_pid: process.pid,
        producer_data
    };
})

server.listen(PORT, HOST, () => {
    console.log(`Producer running at http://${HOST}:${PORT}`);
})