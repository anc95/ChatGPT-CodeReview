const { Headers, Request, Response } = require('node-fetch');
const fetch = require('node-fetch').default;

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.Request = Request;
  globalThis.Response = Response;
}
