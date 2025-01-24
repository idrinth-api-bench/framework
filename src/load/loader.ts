import {
  EMPTY,
  ONE,
  DEFAULT_LANGUAGE,
} from '../constants.js';
import fse from 'fs-extra';
import run from '../main.js';
import language, {
  locale,
} from '../helper/language.js';
import jobCreator from '../routes/job-creator.js';
import Config from '../config/config.js';
import defaultReporter from '../reporter/default-reporter.js';

// eslint-disable-next-line complexity
const loadUp = async(config: Config,) => {
  await locale(config.language ?? DEFAULT_LANGUAGE,);
  if (config.maximum < config.threads) {
    throw new Error(language('maximum_below_threads',),);
  }
  if (config.increment < ONE) {
    throw new Error(language('increment_below_one',),);
  }
  if (config.maximum < ONE) {
    throw new Error(language('maximum_below_one',),);
  }
  const runs = {};
  const job = await jobCreator(`${ config.cwd }`,);
  for (const task of job.main || []) {
    let threads = config.threads;
    do {
      // eslint-disable-next-line no-await-in-loop
      await run({
        language: config.language,
        mode: 'load-testing',
      }, threads, config.repetitions, {
        ...job,
        main: [ task, ],
      },);
      const execution = fse.readJsonSync(config.cwd + '/result.json', 'utf-8',);
      let hasErrors = false;
      for (const test of Object.keys(execution,)) {
        hasErrors = hasErrors || execution[test].errors > EMPTY;
        runs[test + ' x' + threads] = execution[test];
      }
      if (hasErrors) {
        break;
      }
      threads += config.increment;
    } while (threads <= config.maximum);
  }
  defaultReporter(runs, config.cwd,);
  return true;
};
export default loadUp;
