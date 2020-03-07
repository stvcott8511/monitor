import * as dotenv from 'dotenv';
// Load settings configuration from env file.
dotenv.config({
  path: './settings.env'
});

import * as api from '@monitor/apicontroller';
import * as graphQlApi from '@monitor/graphql/graphQLAPI';
import { LogManager } from '@monitor/logging/LogManager';
import { ExceptionWrapper } from '@monitor/utils/utils';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';

// main
var port = process.env.PORT || 8000;
var logger = LogManager.getLogger(process.env.NODE_ENV);
var app = express();
var jsonParser = bodyParser.json();

// Server Addons
// Use morgan to log Express routes.
if (process.env.NODE_ENV == 'development') {
  var writer = {
    write: (data: string) => {
      logger.log(`morgan express log: ${data}`);
    }
  };

  app.use(morgan('combined', {
    stream: writer
  }));
}

// Start of APP Application
app.get('/health', (req, res) => {
  logger.log('Health check invoked');
  res.send({ status: "UP" });
});

// Set Monitor API
app.post('/monitor/add', jsonParser, async (req, res) => {
  try {
    res.send(await api.addMonitor(req.body));
  } catch (error) {
    res.status(500).send(new ExceptionWrapper(error).toJson());
  }
});

app.post('/monitor/remove', jsonParser, async (req, res) => {
  try {
    res.send(await api.removeMonitor(req.body));
  } catch (error) {
    res.status(500).send(new ExceptionWrapper(error).toJson());
  }
});

app.post('/monitor/find', jsonParser, async (req, res) => {
  try {
    res.send(await api.findMonitor(req.body));
  } catch (error) {
    res.status(500).send(new ExceptionWrapper(error).toJson());
  }
});

// Set Client API
app.post('/event/add', jsonParser, async (req, res) => {
  try {
    res.send(await api.addEvent(req.body));
  } catch (error) {
    res.status(500).send(new ExceptionWrapper(error).toJson());
  }
});

app.post('/event/find', jsonParser, async (req, res) => {
  try {
    res.send(await api.findEvent(req.body))
  } catch (error) {
    res.status(500).send(new ExceptionWrapper(error).toJson());
  }
});


// GraphQl hook
graphQlApi(app, logger);

app.listen(port, () => { logger.log(`Server running on port: ${port}`) });