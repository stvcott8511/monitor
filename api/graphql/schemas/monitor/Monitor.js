const graphql = require( "graphql" );
const { GraphQLObjectType, GraphQLString } = graphql;

const Monitor = new GraphQLObjectType( {
    name: "Monitor",
    fields: () => ( {
        _id: { type: GraphQLString },
        monName: { type: GraphQLString },
        description: { type: GraphQLString },
        timeStamp: { type: GraphQLString }
    } )
} );

module.exports = Monitor;