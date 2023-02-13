import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

const packageJSON = `{
  "type": "module",
  "dependencies": {
    "probot": "^12.2.4",
    "chatgpt": "^4.2.0",
    "@vercel/edge": "^0.2.7"
  }
}`;

writeFileSync('dist/package.json', packageJSON, 'utf-8');

execSync('cd dist && npm install');
