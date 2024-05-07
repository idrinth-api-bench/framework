import staticImplements from '../helper/static-implements';
import Middleware from '../middleware';
import Request from '../request';
import Result from '../result';
import language from '../helper/language';

@staticImplements<Middleware>()
export default class MaxTime {
  public static prepare(request: Request,): Request {
    return request;
  }

  public static process(result: Result,): void {
    if (typeof result.maxDuration !== 'number') {
      return;
    }
    if (result.duration > result.maxDuration) {
      throw new Error(language('too_slow', `${ result.maxDuration }`,),);
    }
  }
}
