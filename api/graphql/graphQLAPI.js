const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const rootSchemaMon = require( __dirname + "/schemas/monitor/rootMonitorQuery" );

module.exports = ( app, logger ) => {
  let expressModule = graphqlHTTP( {
    schema: rootSchemaMon( logger ),
    //rootValue: root,
    graphiql: true
  } );
  logger.log( "Applying graphql hook" );
  app.use('/graphql', expressModule );
};