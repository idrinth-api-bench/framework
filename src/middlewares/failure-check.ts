import Middleware from './middleware.js';
import Result from '../messaging/result.js';
import language from '../helper/language.js';
import StandardResponse from '../helper/standard-response.js';
import Request from '../routes/request.js';

export default class FailureCheck implements Middleware {
  public prepare(request: Request,): Request {
    return request;
  }

  public process(result: Result,): void {
    let response: StandardResponse;
    try {
      response = JSON.parse(result.response.body,);
    } catch (e) {
      throw Error(language('invalid_json_body', `${ e }`,),);
    }
    if (response.status === 'success') {
      throw new Error(
        language('response_not_failure', 'status', `${ response.status }`,),
      );
    }

    if (response.success === true) {
      throw new Error(
        language('response_not_failure', 'success', `${ response.success }`,),
      );
    }
  }
}
