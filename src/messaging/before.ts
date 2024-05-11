import language from '../helper/language.js';
import Progress from '../progress/progress.js';
import Job from '../routes/job.js';
import Logger from '../logger/logger.js';
import Thread from '../worker/thread.js';
import {
  EMPTY,
} from '../constants.js';

const onBefore = (
  progress: Progress,
  job: Job,
  logger: Logger,
  before: Thread,
  startMain: () => void,
  // eslint-disable-next-line max-params
): void => {
  progress.increment();
  if (job.before.length > EMPTY) {
    logger.debug(language('next_request',),);
    before.postMessage(job.before.shift(),);
    return;
  }
  before.terminate();
  startMain();
};
export default onBefore;
