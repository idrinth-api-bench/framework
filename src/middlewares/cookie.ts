import Middleware from '../middleware';
import Request from '../request';
import Result from '../result';
import staticImplements from '../helper/static-implements';
import store from '../store';

@staticImplements<Middleware>()
class Cookie {
  public static prepare(request: Request,): Request {
    if (typeof request.cookies === 'undefined') {
      request.cookies = {};
    }
    const jar = JSON.parse(store.get('cookie', '{}',),);
    for (const cookie in jar) {
      if (typeof jar[cookie] === 'string') {
        request.cookies[cookie] = request.cookies[cookie] || jar[cookie];
      }
    }
    return request;
  }

  public static process(response: Result,): void {
    if (typeof response.response.cookies === 'undefined') {
      return;
    }
    const jar = JSON.parse(store.get('cookie', '{}',),);
    for (const cookie in response.response.cookies) {
      if (typeof response.response.cookies[cookie] === 'string') {
        jar[cookie] = response.response.cookies[cookie];
      }
    }
    store.set('cookie', JSON.stringify(jar,),);
  }
}
export default Cookie;
