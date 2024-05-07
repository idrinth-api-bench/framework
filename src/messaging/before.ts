import language from '../helper/language';
import Progress from '../progress/progress';
import Job from '../job';
import Logger from '../logger/logger';
import Thread from '../worker/thread';
import {
  EMPTY,
} from '../constants';

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
