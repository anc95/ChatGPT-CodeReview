require('./fetch-polyfill.cjs');
const { run } = require('@probot/adapter-github-actions');
const { robot } = require('./bot');
require('./log');

run(robot);
