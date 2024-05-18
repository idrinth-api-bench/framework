import {
  process as processType,
  prepare as prepareType,
} from './middleware.js';
import Request from '../routes/request.js';
import Result from '../messaging/result.js';
import store from '../store/store.js';

export const prepare: prepareType = (request: Request,): Request => {
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

export const process: processType = (response: Result,): void => {
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
