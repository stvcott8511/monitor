const graphql = require( "graphql" );
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql;
const MonitorType = require( __dirname + "/Monitor" );
const _ = require( "lodash" );
const dbManager = require( __dirname + "/../../../database/dbManager" );

// Test data for now
let monitors = [ 
    { 
       "_id":"5dacb79c93ad26692d2d208f",
       "monName":"mon1",
       "description":"Testing monitor db collection",
       "timeStamp":"2019-10-20T15:38:04-04:00"
    },
    { 
       "_id":"5dacb7b093ad26692d2d2090",
       "monName":"mon2",
       "description":"Testing monitor db collection",
       "timeStamp":"2019-10-20T15:38:24-04:00"
    }
];

let qlRoot = ( logger ) => {
    let db = dbManager( "Defualt", logger, "monitors" );
    const RootQuery = new GraphQLObjectType( {
        name: "RootQueryType",
        fields: {
            monitor: {
                type: MonitorType,
                args: { _id: { type: GraphQLString } },
                resolve( parent, args ) {
                    return _.find( monitors, { _id: args._id } );
                }
            },
            monitors: {
                type: new GraphQLList( MonitorType ),
                async resolve( parent, args ) {
                    try {
                        return await db.find( {} );
                    } catch (err) {
                        logger.log( "GraphQL query failed" );
                        return [];
                    }
                }
            }
        }
    } );

    return new GraphQLSchema( {
        query: RootQuery
    } );
}

module.exports = qlRoot;