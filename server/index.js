const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/type-defs');
const { resolvers } = require('./schema/resolvers');


const server = new ApolloServer({
    typeDefs, 
    resolvers
});

// let PORT = 1338;
server.listen().then(({url}) => { 
    console.log(`Your API is running at: ${url} :)`);
});

// functions that resolve your types and do stuff, like make calls to APIs, make calls to 
// databases, send data back - will be enclosed inside of a variable which we call resolvers.