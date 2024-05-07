import FinishedSet from '../finished-set';
import language from '../helper/language';
import FinishedRun from '../finished-run';
import Storage from '../storage/storage';
import Logger from '../logger/logger';
import Progress from '../progress/progress';
import Thread from '../worker/thread';
import Counter from '../counter';
import ReportModifier from '../report-modifier/report-modifier';
import Reporter from '../reporter/reporter';

const startResults = (
  logger: Logger,
  calculator: Thread,
  finished: FinishedRun,
  reportModifiers: ReportModifier[],
  resultHandler: Reporter,
  resultOutputDir: string,
  // eslint-disable-next-line max-params
): void => {
  if (! Counter.isEmpty('active',) || ! Counter.isEmpty('analyzing',)) {
    return;
  }
  calculator.terminate();
  logger.info(language('starting_result',),);
  logger.debug(language('data',), finished,);
  for (const reportModifier of reportModifiers) {
    for (const set of Object.keys(finished,)) {
      finished[set] = reportModifier.adjust(finished[set],);
    }
  }
  resultHandler(finished, resultOutputDir,);
  logger.info(language('done',),);
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
  );
};
export default onCalculate;
