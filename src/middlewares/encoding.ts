import Middleware from './middleware.js';
import Request from '../routes/request.js';
import formUrlEncoded from 'form-urlencoded';
import Result from '../messaging/result.js';

const handleForm = (request: Request,): Request => {
  if (! request.headers['content-type']) {
    request.headers['content-type'] = 'application/x-www-form-urlencoded';
  }
  request.body = formUrlEncoded(request.body,);
  return request;
};
const handleJSON = (request: Request,): Request => {
  request.body = JSON.stringify(request.body,);
  if (! request.headers['content-type']) {
    request.headers['content-type'] = 'application/json';
  }
  return request;
};

class Encoding implements Middleware {
  public prepare(request: Request,): Request {
    if (typeof request.headers === 'undefined') {
      request.headers = {};
    }
    if (request.autohandle === 'json') {
      return handleJSON(request,);
    }
    if (request.autohandle === 'form' && typeof request.body === 'object') {
      return handleForm(request,);
    }
    return request;
  }

  public process(response: Result,): void {
    //no task here
  }
}
export default Encoding;
