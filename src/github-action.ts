import githubAction from '@probot/adapter-github-actions';
import './fetch-polyfill'
import { robot } from './bot';

githubAction.run(robot);
