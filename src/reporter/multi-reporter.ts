import Reporter from './reporter.js';
import FinishedRun from '../messaging/finished-run.js';
import MultiReporterType from './multi-reporter-type.js';

const reporters: Array<Reporter> = [];

const multi: MultiReporterType = (
  results: FinishedRun,
  rootDir: string,
): void => {
  for (const reporter of reporters) {
    reporter(results, rootDir,);
  }
};

multi.addReporter = (reporter: Reporter,): void => {
  if (! reporters.includes(reporter,)) {
    reporters.push(reporter,);
  }
};

export default multi;
export const MultiReporter = multi;
