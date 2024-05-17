import jobCreator from '../routes/job-creator.js';
import language, {
  locale,
} from '../helper/language.js';
import {
  DEFAULT_LANGUAGE,
  EMPTY,
  FIRST_ARGUMENT,
} from '../constants.js';
import taskTypes from '../routes/task-types.js';
import logSymbols from 'log-symbols';
import error from '../validation/error.js';
import checkType from '../validation/check-type.js';
import noDuplicateIds from '../validation/no-duplicate-ids.js';

// eslint-disable-next-line complexity
export default async(args: string[], cwd: string,): Promise<void> => {
  await locale(args[FIRST_ARGUMENT] || DEFAULT_LANGUAGE,);
  const job = await jobCreator(cwd,);
  noDuplicateIds(job.main,);
  let errors = 0;
  let warnings = 0;
  for (const type of taskTypes) {
    const result = checkType(job, type,);
    errors += result.errors;
    warnings += result.warnings;
  }
  if (errors > EMPTY) {
    error('validation_errors', `${ errors }`,);
  }
  if (warnings > EMPTY) {
    error('validation_warnings', `${ warnings }`,);
  }
  if (warnings === EMPTY && errors === EMPTY) {
    console.log(logSymbols.success + ' ' + language('no_errors_warnings',),);
  }
};
