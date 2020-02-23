const graphql = require( "graphql" );
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const EventType = require( __dirname + "/Event" );

const RootQuery = new GraphQLObjectType( {
    name: "RootQueryType",
    fields: {
        event: {
            type: EventType,
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

