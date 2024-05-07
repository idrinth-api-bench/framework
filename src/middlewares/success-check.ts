import staticImplements from '../helper/static-implements';
import Middleware from '../middleware';
import Result from '../result';
import language from '../helper/language';
import StandardResponse from '../standard-response';

/*
Below Document Defines the standards upon which most apis will be constructed
for success scenarios :

1) JSEND - https://github.com/omniti-labs/jsend
{
  "status": "success",
  "data":{},
}

2) Another Common Format
{
  "success": true,
  "data": {}
}
*/

@staticImplements<Middleware>()
export default class SuccessCheck {
  public static prepare(request: Request,): Request {
    return request;
  }

  public static process(result: Result,): void {
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

