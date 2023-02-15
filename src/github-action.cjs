const { run } = require('@probot/adapter-github-actions');
const fetch = require('node-fetch').default;
const { Headers, Request, Response } = require('node-fetch');
const { robot } = require('./bot');

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.Request = Request;
  globalThis.Response = Response;
}

run(robot);
