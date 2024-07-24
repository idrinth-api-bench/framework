import FinishedSet from './finished-set.js';
import language from '../helper/language.js';
import FinishedRun from './finished-run.js';
import Storage from '../storage/storage.js';
import Logger from '../logger/logger.js';
import Progress from '../progress/progress.js';
import Thread from '../worker/thread.js';
import Counter from '../helper/counter.js';
import ReportModifier from '../report-modifier/report-modifier.js';
import Reporter from '../reporter/reporter.js';

const startResults = (
  logger: Logger,
  calculator: Thread,
  finished: FinishedRun,
  reportModifiers: ReportModifier[],
  resultHandler: Reporter,
  resultOutputDir: string,
  resolver: {resolve(value: boolean,): void},
  // eslint-disable-next-line max-params
): void => {
  if (! Counter.isEmpty('active',) || ! Counter.isEmpty('analyzing',)) {
    return;
  }
  calculator.terminate();
  logger.info(language('starting_result',),);
  logger.debug(language('data',), finished,);
  let hasErrors = false;
  for (const reportModifier of reportModifiers) {
    for (const set of Object.keys(finished,)) {
      finished[set] = reportModifier.adjust(finished[set],);
      hasErrors = hasErrors || finished[set].errors > 0;
    }
  }
  resultHandler(finished, resultOutputDir,);
  logger.info(language('done',),);
  resolver.resolve(hasErrors);
};
const onCalculate = (
  data: FinishedSet,
  finished: FinishedRun,
  now: Date,
  resultStorage: Storage,
  logger: Logger,
  progress: Progress,
  calculator: Thread,
  reportModifiers: ReportModifier[],
  reporter: Reporter,
  resultOutputDir: string,
  resolver: {resolve(value: boolean,): void},
  // eslint-disable-next-line max-params
): void => {
  finished[data.id] = data;
  resultStorage.store(data, now,);
  logger.debug(language('finished_analyzing', data.id,),);
  Counter.decrement('analyzing',);
  progress.increment();
  startResults(
    logger,
    calculator,
    finished,
    reportModifiers,
    reporter,
    resultOutputDir,
    resolver,
  );
};
export default onCalculate;
