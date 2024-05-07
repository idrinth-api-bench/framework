import FinishedSet from './finished-set';
import ResultSet from './result-set';
import ValidationResult from './validation-result';
import Logger from './logger/logger';
import Reporter from './reporter/reporter';
import validateTasks from './validate-tasks';
import Job from './job';
import ReportModifier from './report-modifier/report-modifier';
import Storage from './storage/storage';
import Progress from './progress/progress';
import language from './helper/language';
import onBefore from './messaging/before';
import onAfter from './messaging/after';
import onWorker from './messaging/worker';
import onCalculate from './messaging/calculator';
import Counter from './counter';
import WorkerConstructor from './worker/worker-constructor';
import buildWorker from './worker/worker-factory';
import Thread from './worker/thread';
import {
  EMPTY,
} from './constants';
import Task from './task';
import buildTaskList from './build-task-list';

/* eslint max-params:0 */
const executor = (
  threads: number,
  repetitions: number,
  job: Job,
  resultHandler: Reporter,
  logger: Logger,
  Worker: WorkerConstructor,
  reportModifiers: Array<ReportModifier>,
  resultStorage: Storage,
  resultOutputDir: string,
  progress: Progress,
  blacklist: string[],
): void => {
  const total = threads*repetitions;
  const now = new Date();
  validateTasks(repetitions, threads, job.main,);
  const results: {[z: string]: ResultSet} = {};
  const finished: {[z: string]: FinishedSet} = {};
  logger.debug(
    language('initialization', `${ repetitions }`, `${ threads }`,),
  );
  const internalTasks: Task[] = buildTaskList(job.main, blacklist, total,);
  progress.start(job, repetitions, threads,);
  const calculator = buildWorker(
    Worker,
    'calculator',
    (data: FinishedSet, self:Thread,) => onCalculate(
      data,
      finished,
      now,
      resultStorage,
      logger,
      progress,
      self,
      reportModifiers,
      resultHandler,
      resultOutputDir,
    ),
  );
  const after = buildWorker(
    Worker,
    'webrequest',
    (data, self: Thread,) => onAfter(
      progress,
      job,
      logger,
      self,
    ),
  );
  const startMain = () => {
    logger.debug(language('starting_workers', `${ threads }`,),);
    for (let j=0; j<threads; j ++) {
      const worker = buildWorker(
        Worker,
        'webrequest',
        (data: ValidationResult, self: Thread,) => onWorker(
          data,
          progress,
          logger,
          results,
          total,
          calculator,
          internalTasks,
          self,
          after,
          job,
        ),
      );
      Counter.increment('active',);
      worker.postMessage(internalTasks.shift(),);
    }
  };
  const before = buildWorker(
    Worker,
    'webrequest',
    (data, self: Thread,) => onBefore(
      progress,
      job,
      logger,
      self,
      startMain,
    ),
  );
  if (job.before.length > EMPTY) {
    logger.debug(language('next_request',),);
    before.postMessage(job.before.shift(),);
  } else {
    before.terminate();
    startMain();
  }
};

export default executor;
