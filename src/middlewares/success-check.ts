import Middleware from './middleware.js';
import Result from '../messaging/result.js';
import language from '../helper/language.js';
import StandardResponse from '../helper/standard-response.js';
import Request from '../routes/request.js';

export default class SuccessCheck implements Middleware {
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

    if (response.status === 'fail' || response.status === 'error') {
      throw new Error(
        language('response_not_success', 'status', `${ response.status }`,),
      );
    }

    if (response.success === false) {
      throw new Error(
        language('response_not_success', 'success', `${ response.success }`,),
      );
    }
  }
}

