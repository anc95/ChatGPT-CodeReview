import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

const packageJSON = `{
  "type": "module",
  "dependencies": {
    "probot": "^12.2.4",
    "chatgpt": "^4.2.0",
    "next": "^13.1.6",
  }
}`;

writeFileSync('dist/package.json', packageJSON, 'utf-8');

execSync('cd dist && npm install');
