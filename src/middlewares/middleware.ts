import Request from '../routes/request.js';
import Result from '../messaging/result.js';

export interface Middleware {
  process(response: Result): void;
  prepare(request: Request): Request;
}

export default Middleware;
