const graphql = require( "graphql" );
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const MonitorType = require( __dirname + "/Monitor" );

const RootQuery = new GraphQLObjectType( {
    name: "RootQueryType",
    fields: {
        monitor: {
            type: MonitorType,
            args: { _id: { type: GraphQLString } },
            resolve( parent, args ) {
                //todo
                debugger;
            }
        }
    }
} );

module.exports = new GraphQLSchema( {
    query: RootQuery
} );