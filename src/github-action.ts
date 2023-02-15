import githubAction from '@probot/adapter-github-actions';
import { robot } from './bot';

githubAction.run(robot);
