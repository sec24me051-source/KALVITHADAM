let serverless;
try {
  serverless = require('serverless-http');
} catch (e) {
  serverless = require('../../backend/node_modules/serverless-http');
}

const app = require('../../backend/app');

module.exports.handler = serverless(app);
