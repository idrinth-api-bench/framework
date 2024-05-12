import Middleware from './middleware.js';
import Request from '../routes/request.js';
import Result from '../messaging/result.js';
import language from '../helper/language.js';

const MAXIMUM = 299;
const MINIMUM = 200;

export default class Status2xx implements Middleware {
  public prepare(request: Request,): Request {
    return request;
  }

  public process(response: Result,): void {
    if (typeof response.response.status === 'undefined') {
      throw new Error(language('no_response_status',),);
    }
    if (response.response.status > MAXIMUM) {
      throw new Error(language('response_status_above_2xx',),);
    }
    if (response.response.status < MINIMUM) {
      throw new Error(language('response_status_below_2xx',),);
    }
  }
}
