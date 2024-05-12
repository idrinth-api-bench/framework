import Middleware from './middleware.js';
import Request from '../routes/request.js';
import Result from '../messaging/result.js';
import HashMap from '../helper/hashmap.js';
import store from '../store/store.js';

const jsonCheck = /^application\/json/ui;

const get = (
  fallback: string,
  body: HashMap,
  ...keys: Array<string>
): string => {
  for (const key of keys) {
    if (typeof body[key] === 'string') {
      return body[key];
    }
  }
  return fallback;
};

class Access implements Middleware {
  public prepare(request: Request,): Request {
    const access = store.get('access', '',);
    const refresh = store.get('refresh', '',);
    if (access) {
      if (typeof request.body === 'string') {
        request.body = request.body.replace(
          /%refresh-token-middleware%/ug,
          refresh,
        );
        request.body = request.body.replace(
          /%access-token-middleware%/ug,
          access,
        );
      }
      if (typeof request.headers === 'undefined') {
        request.headers = {};
      }
      request.headers.authorization = `Bearer ${ access }`;
    }
    return request;
  }

  public process(response: Result,): void {
    if (typeof response.response.headers === 'undefined') {
      return;
    }
    const contentType = response.response.headers['content-type'];
    if (! jsonCheck.test(contentType,)) {
      return;
    }
    const body = JSON.parse(response.response.body,);
    let access = store.get('access', '',);
    let refresh = store.get('refresh', '',);
    access = get(access, body, 'access', 'access_token', 'access-token',);
    refresh = get(refresh, body, 'refresh', 'refresh_token', 'refresh-token',);
    store.set('access', access,);
    store.set('refresh', refresh,);
  }
}
export default Access;
