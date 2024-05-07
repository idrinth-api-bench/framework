import staticImplements from '../helper/static-implements';
import Middleware from '../middleware';
import Request from '../request';
import Result from '../result';
import language from '../helper/language';

@staticImplements<Middleware>()
export default class SilentServerValidator {
  public static prepare(request: Request,): Request {
    return request;
  }

  public static process(result: Result,): void {
    if (typeof result.response.headers.Server !== 'undefined') {
      throw Error(language('server_header_is_set',),);
    }
    if (typeof result.response.headers['X-Powered-By'] !== 'undefined') {
      throw Error(language('powered_by_is_set',),);
    }
  }
}
