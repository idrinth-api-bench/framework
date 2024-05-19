import Request from '../routes/request.js';
import Result from '../messaging/result.js';

export type process = (response: Result) => void;
export type prepare = (request: Request) => Request;
