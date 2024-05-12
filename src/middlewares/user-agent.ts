import Middleware from './middleware.js';
import Result from '../messaging/result.js';
import Request from '../routes/request.js';
import agent from '../helper/user-agent.js';

export default class UserAgent implements Middleware {
  public prepare(request: Request,): Request {
    if (typeof request.headers === 'undefined') {
      request.headers = {};
    }
    if (! request.headers['user-agent']) {
      request.headers['user-agent'] = agent;
    }
    return request;
  }

  public process(response: Result,): void {
    // noop
  }
}
