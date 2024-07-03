import Task from './routes/task.js';
import Logger from './logger/logger.js';
import NullLogger from './logger/null-logger.js';
import Reporter from './reporter/reporter.js';
import defaultReporter from './reporter/default-reporter.js';
import executor from './executor.js';
import {
  Worker,
} from 'worker_threads';
import Job from './routes/job.js';
import jobCreator from './routes/job-creator.js';
import ReportModifier from './report-modifier/report-modifier.js';
import Storage from './storage/storage.js';
import NoopStorage from './storage/noop-storage.js';
import Progress from './progress/progress.js';
import ProgressBar from './progress/progress-bar.js';
import {
  locale,
} from './helper/language.js';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_REPETITIONS,
  DEFAULT_THREADS,
} from './constants.js';
import blacklist from './routes/blacklist.js';
import validateTasks from "./routes/validate-tasks.js";

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
    mode?: 'benchmarking'|'content-testing'|'load-testing'|'stress-testing'|'verify',
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
  if (configuration.mode === 'verify') {
    return validateTasks(repetitions, threads, job.main);
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
