import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

const packageJSON = `{
  "type": "module",
  "dependencies": {
    "probot": "^12.2.4",
    "chatgpt": "^4.2.0",
    "next": "^13.1.6"
  }
}`;

const middlewareJs = './dist/middleware.js';

writeFileSync(
  middlewareJs,
  readFileSync(middlewareJs, 'utf-8').replaceAll('__dirname', '/')
);
writeFileSync('dist/package.json', packageJSON, 'utf-8');

execSync('cd dist && npm install');
