import Reporter from './reporter';
import FinishedRun from '../finished-run';
import MultiReporterType from './multi-reporter-type';

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
