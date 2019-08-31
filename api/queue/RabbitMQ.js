const _ = require( "lodash" );
const amqp = require('amqplib');

class BaseMQ
{
    constructor( host, port, queueName, logger )
    {
        this.host = host;
        this.port = port;
        this.queueName = queueName;
        this.logger = logger;
        this.durable = false;
        this.persistent = false;
        this.conn = undefined;
    }

    async openConnection() 
    {
        let connString = `${this.host}:${this.port}`;
        if( _.isUndefined( this.conn ) )
            this.conn = await amqp.connect( connString );
        
        this.logger.log( `RabbitMq connected to ${connString}` );
        return this.conn;
    }
    
    setdrable( b )
    {
        this.durable = b;
    }

    setPersistent( b )
    {
        this.persistent = b;
    }
    
    closeConnection()
    {
        this.conn.closeConnection();
        this.conn = undefined;
    }
}

class Producer
{
    constructor( conn, logger )
    {
        this.conn = conn;
        this.logger = logger;
    }

    async send( msg )
    {
        let conn = await this.conn.openConnection();
        let channel = await conn.createChannel();
        let queue = 'monq';;

        channel.assertQueue( queue, {
            durable: this.conn.durable
        });

        channel.sendToQueue( queue, Buffer.from( msg ), {
            persistent: this.conn.persistent
        });
    }
}

class Consumer
{
    //TODO
}

class RabbitMqFull
{
    constructor( host, port, queueName, logger )
    {

        this.producer = new Producer( new BaseMQ( host, port, queueName, logger ), logger );
        //this.Consumer = new Consumer( host, port, queueName, logger );
        this.logger = logger;
    }

    async push( msg )
    {
        await this.producer.send( JSON.stringify( msg ) );
    }
}

module.exports = RabbitMqFull;