import 'fastify';
import fastify from 'fastify';
import mercurius from 'mercurius';
import * as fs from'fs';

const schema = fs.readFileSync(__dirname + '/../shared/graphql-schema.gql').toString();

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;

const server = new fastify();

const resolvers = {
    Query: {
        pid: () => process.pid,
        recipe: async (_obj, { id }) => {
            if (id != 42) throw new Error(`recipe ${id} not found`)
            return {
                id, name: "Chicken Tikka Masala",
                steps: "Throw it in a pot...",
            }
        }
    },
    Recipe: {
        ingredients: async (obj) => {
            return (obj.id != 42) ? [] : [
                { id: 1, name: "Tofu", quantity: "400g" },
                { id: 2, name: "Sauce", quantity: "400g" },
            ]
        }
    }
};

server.register(mercurius, {
    schema,
    resolvers,
    graphql: true
});

server.listen(PORT, HOST, () => {
    console.log(`Producer running at http://${HOST}:${PORT}`);
});