import {
  process as processType
} from './middleware.js';
import Result from '../messaging/result.js';
import language from '../helper/language.js';

const STATUS = 403;

export const process: processType = (response: Result,): void => {
  if (typeof response.response.status === 'undefined') {
    throw new Error(language('no_response_status',),);
  }
  if (response.response.status !== STATUS) {
    throw new Error(language(
      'response_status_not_403',
      `${ response.response.status }`,
    ),);
  }
}
