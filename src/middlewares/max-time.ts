import Middleware from './middleware.js';
import Request from '../routes/request.js';
import Result from '../messaging/result.js';
import language from '../helper/language.js';

export default class MaxTime implements Middleware {
  public prepare(request: Request,): Request {
    return request;
  }

  public process(result: Result,): void {
    if (typeof result.maxDuration !== 'number') {
      return;
    }
    if (result.duration > result.maxDuration) {
      throw new Error(language('too_slow', `${ result.maxDuration }`,),);
    }
  }
}
