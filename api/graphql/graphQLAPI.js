const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const rootSchemaMon = require( __dirname + "/schemas/monitor/rootMonitorQuery" );
const rootSchemaEvent = require( __dirname + "/schemas/event/rootEventQuery" );

let schema = buildSchema(`
  type Query {
    hello: String
  }
`);
let root = { hello: () => 'Hello world!' };

let expressModule = graphqlHTTP( {
  schema: rootSchemaMon,
  //rootValue: root,
  graphiql: true
} );

module.exports = ( app, logger ) => {
  logger.log( "Applying graphql hook" );
  app.use('/graphql', expressModule );
};