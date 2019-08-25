class BaseDB
{
    constructor( dbHost, port, dbName, collection, logger )
    {
        this.logger = logger
    }

    find( query ) {
        this.logger.log( query );
        return {};
    }
    insert( data ) {
        this.logger.log( query );
        return {};
    }
    update( query, data ) {
        this.logger.log( query );
        return {};
    }
    delete( query ) {
        this.logger.log( query );
        return {};
    }
    deleteMany( query ) {
        this.logger.log( query );
        return {};
    }
}

module.exports = BaseDB;