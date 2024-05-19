import {
  prepare as prepareType,
} from './middleware.js';
import Request from '../routes/request.js';
import agent from '../helper/user-agent.js';

export const prepare: prepareType = (request: Request,): Request => {
  if (typeof request.headers === 'undefined') {
    request.headers = {};
  }
  if (! request.headers['user-agent']) {
    request.headers['user-agent'] = agent;
  }
  return request;
};
