// [START gae_flex_datastore_app]
'use strict';

const express = require('express');

const app = express();
app.enable('trust proxy');
const {Datastore} = require('@google-cloud/datastore');

// Instantiate a datastore client
const datastore = new Datastore();

app.get('/getcustomer', async (req, res, next) => {
  try {
	const query = datastore
    .createQuery('customer')
    .limit(10);
	
    const [entities] = await datastore.runQuery(query);
    const customers = entities.map(
      entity => `ID: ${entity.id}, Name: ${entity.Name}, Age: ${entity.Age}, Address: ${entity.Address}`
    );
    res.setHeader('Content-Type', 'application/json');
    res.end( JSON.stringify(customers));
  } catch (error) {
    next(error);
  }
});

app.get('/getcustomer/:id', async (req, res, next) => {
  try {
	const query = datastore
    .createQuery('customer')
    .filter('id', '=', +req.params.id);
    const [entities] = await datastore.runQuery(query);
    const customers = entities.map(
      entity => `ID: ${entity.id}, Name: ${entity.Name}, Age: ${entity.Age}, Address: ${entity.Address}`
    );
    res.setHeader('Content-Type', 'application/json');
    res.end( JSON.stringify(customers));
  } catch (error) {
    next(error);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT || 8080, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_flex_datastore_app]

module.exports = app;

