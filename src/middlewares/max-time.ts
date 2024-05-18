import {
  process as processType,
} from './middleware.js';
import Result from '../messaging/result.js';
import language from '../helper/language.js';

export const process: processType = (result: Result,): void => {
  if (typeof result.maxDuration !== 'number') {
    return;
  }
  if (result.duration > result.maxDuration) {
    throw new Error(language('too_slow', `${ result.maxDuration }`,),);
  }
};
