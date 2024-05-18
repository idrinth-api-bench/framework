import {
  process as processType,
  prepare as prepareType,
} from './middleware.js';
import Request from '../routes/request.js';
import Result from '../messaging/result.js';
import store from '../store/store.js';

export const prepare: prepareType = (request: Request,): Request => {
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

export const process: processType = (response: Result,): void => {
  if (typeof response.response.headers === 'undefined') {
    return;
  }
  if (response.response.headers['x-csrf-token']) {
    store.set('csrf', response.response.headers['x-csrf-token'],);
  }
}
