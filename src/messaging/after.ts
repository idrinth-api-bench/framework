import language from '../helper/language';
import store from '../store';
import Progress from '../progress/progress';
import Job from '../job';
import Logger from '../logger/logger';
import Thread from '../worker/thread';
import {
  EMPTY,
} from '../constants';

const onAfter = (
  progress: Progress,
  job: Job,
  logger: Logger,
  after: Thread,
  // eslint-disable-next-line max-params
): void => {
  progress.increment();
  if (job.after.length > EMPTY) {
    logger.debug(language('next_request',),);
    after.postMessage(job.after.shift(),);
    return;
  }
  store.clean();
  after.terminate();
  logger.debug(language('after_done',),);
};
export default onAfter;
