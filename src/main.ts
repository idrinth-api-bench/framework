import Task from './task';
import Logger from './logger/logger';
import NullLogger from './logger/null-logger';
import Reporter from './reporter/reporter';
import defaultReporter from './helper/default-reporter';
import executor from './executor';
import {
  Worker,
} from 'worker_threads';
import Job from './job';
import jobCreator from './helper/job-creator';
import ReportModifier from './report-modifier/report-modifier';
import Storage from './storage/storage';
import NoopStorage from './storage/noop-storage';
import Progress from './progress/progress';
import ProgressBar from './progress/progress-bar';
import {
  locale,
} from './helper/language';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_REPETITIONS,
  DEFAULT_THREADS,
} from './constants';
import blacklist from './blacklist';

// eslint-disable-next-line complexity
export const run = async(
  configuration: {
    reportModifiers?: Array<ReportModifier>,
    logger?: Logger,
    resultHandler?: Reporter,
    resultStorage?: Storage,
    resultOutputDir?: string
    progress?: Progress,
    language?: string,
    blacklist?: string[],
    mode?: 'benchmarking'|'content-testing'|'load-testing'|'stress-testing',
    taskId?: string,
    cwd?: string,
  },
  threads = DEFAULT_THREADS,
  repetitions = DEFAULT_REPETITIONS,
  job?: Job|Array<Task>|undefined,
  // eslint-disable-next-line max-params
): Promise<void> => {
  await locale(configuration.language || DEFAULT_LANGUAGE,);
  if (typeof configuration.logger === 'undefined') {
    configuration.logger = new NullLogger();
  }
  if (typeof configuration.resultStorage === 'undefined') {
    configuration.resultStorage = new NoopStorage();
  }
  if (typeof configuration.resultHandler === 'undefined') {
    configuration.resultHandler = defaultReporter;
  }
  if (typeof configuration.reportModifiers === 'undefined') {
    configuration.reportModifiers = [];
  }
  if (typeof configuration.progress === 'undefined') {
    configuration.progress = new ProgressBar();
  }
  if (typeof configuration.blacklist === 'undefined') {
    configuration.blacklist = blacklist(
      process.cwd(),
      configuration.mode || 'benchmarking',
    );
  }
  if (typeof job === 'undefined') {
    job = await jobCreator(configuration.cwd || process.cwd(),);
  } else if (typeof job === 'object' && Array.isArray(job,)) {
    job = {
      before: [],
      beforeTask: [],
      beforeEach: [],
      main: job,
      afterEach: [],
      afterTask: [],
      after: [],
    };
  }
  if (typeof configuration.taskId === 'string') {
    const output: Task[] = [];
    for (const task of job.main || []) {
      if (task?.id.includes(configuration.taskId,)) {
        output.push(task,);
      }
    }
    job.main = output;
  }
  executor(
    threads,
    repetitions,
    job,
    configuration.resultHandler,
    configuration.logger,
    Worker,
    configuration.reportModifiers,
    configuration.resultStorage,
    configuration.resultOutputDir || process.cwd(),
    configuration.progress,
    configuration.blacklist,
  );
};

export default run;
