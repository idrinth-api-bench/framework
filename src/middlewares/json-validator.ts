import {
  process as processType,
} from './middleware.js';
import Result from '../messaging/result.js';
import language from '../helper/language.js';

const jsonCheck = /^application\/json/ui;

export const process: processType = (result: Result,): void => {
  if (typeof result.response.headers['content-type'] === 'undefined') {
    throw Error(language('no_content_type',),);
  }
  const contentType = result.response.headers['content-type'];
  if (! jsonCheck.test(contentType,)) {
    throw Error(language('no_json_content_type', contentType,),);
  }
  try {
    JSON.parse(result.response.body,);
  } catch (e) {
    throw Error(language('invalid_json_body', `${ e }`,),);
  }
};
