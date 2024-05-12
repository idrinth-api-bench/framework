import Middleware from './middleware.js';
import Request from '../routes/request.js';
import Result from '../messaging/result.js';
import language from '../helper/language.js';

const STATUS = 404;

export default class Status404 implements Middleware {
  public prepare(request: Request,): Request {
    return request;
  }

  public process(response: Result,): void {
    if (typeof response.response.status === 'undefined') {
      throw new Error(language('no_response_status',),);
    }
    if (response.response.status !== STATUS) {
      throw new Error(
        language('response_status_not_404', `${ response.response.status }`,),
      );
    }
  }
}
