'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
  const params = {
	// PCJ: Minor change from original, use environment variable for stage sensitive table name
    TableName: process.env.TABLE_NAME,
    Key: {
      id: event.pathParameters.id,
    },
  };

  // write the todo to the database
  dynamoDb.delete(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error); // eslint-disable-line no-console
      callback(new Error('Couldn\'t remove the todo item.'));
      return;
    }

    // create a resonse
    const response = {
      statusCode: 200,
      body: JSON.stringify({}),
    };
    callback(null, response);
  });
};
