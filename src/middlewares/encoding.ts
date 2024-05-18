import {
  prepare as prepareType
} from './middleware.js';
import Request from '../routes/request.js';
import formUrlEncoded from 'form-urlencoded';

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

export const prepare: prepareType = (request: Request,): Request => {
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
