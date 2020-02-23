const graphql = require( "graphql" );
const { GraphQLObjectType, GraphQLString } = graphql;

const Event = new GraphQLObjectType( {
    name: "Event",
    fields: () => ( {
        _id: { type: GraphQLString },
        eventID: { type: GraphQLString },
        linkedMon: { type: GraphQLString },
        alert: { type: GraphQLString },
        timeStamp:  { type: GraphQLString }
    } )
} );

module.exports = Event;