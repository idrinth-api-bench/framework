import Middleware from '../middleware';
import Request from '../request';
import Result from '../result';
import staticImplements from '../helper/static-implements';
import language from '../helper/language';

const MAXIMUM = 299;
const MINIMUM = 200;

@staticImplements<Middleware>()
class Status2xx {
  public static prepare(request: Request,): Request {
    return request;
  }

  public static process(response: Result,): void {
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
export default Status2xx;
