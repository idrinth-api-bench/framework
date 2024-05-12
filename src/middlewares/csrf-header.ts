import Middleware from './middleware.js';
import Request from '../routes/request.js';
import Result from '../messaging/result.js';
import store from '../store/store.js';

class CsrfHeader implements Middleware {
  public prepare(request: Request,): Request {
    const csrf = store.get('csrf', '',);
    if (csrf) {
      if (typeof request.headers === 'undefined') {
        request.headers = {};
      }
      if (! request.headers['x-csrf-token']) {
        request.headers['x-csrf-token'] = csrf;
      }
    }
    return request;
  }

  public process(response: Result,): void {
    if (typeof response.response.headers === 'undefined') {
      return;
    }
    if (response.response.headers['x-csrf-token']) {
      store.set('csrf', response.response.headers['x-csrf-token'],);
    }
  }
}
export default CsrfHeader;
