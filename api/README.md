# Monitor API
### Prerequisites
- NodeJS
- MongoDB
- Rabbitmq

### Buliding the API using Docker for MongoDB and Rabbitmq for development
1. Install NodeJS on development system
2. Install Docker on developmnet system
   1. See link for more information https://docs.docker.com/install/
3. Create MongoDB Container
   ```bash
    docker run -P --name monitor -d mongo
    ```
4. Create Rabbitmq Container
   ```bash
    docker run -P -d --hostname my-rabbit --name mq rabbitmq:3
    ```
5. Starting the applaction
    ```bash
    npm i
    node server.js
    ```