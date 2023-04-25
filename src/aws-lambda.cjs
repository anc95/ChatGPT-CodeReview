const {
  createLambdaFunction,
  createProbot,
} = require("@probot/adapter-aws-lambda-serverless");
const appFn = require('./bot').robot;

module.exports.webhooks = createLambdaFunction(appFn, {
  probot: createProbot(),
});
