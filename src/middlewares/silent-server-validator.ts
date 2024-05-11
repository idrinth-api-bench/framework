import Middleware from './middleware.js';
import Request from '../routes/request.js';
import Result from '../messaging/result.js';
import language from '../helper/language.js';

export default class SilentServerValidator implements Middleware {
  public prepare(request: Request,): Request {
    return request;
  }

  public process(result: Result,): void {
    if (typeof result.response.headers.Server !== 'undefined') {
      throw Error(language('server_header_is_set',),);
    }
    if (typeof result.response.headers['X-Powered-By'] !== 'undefined') {
      throw Error(language('powered_by_is_set',),);
    }
  }
}
