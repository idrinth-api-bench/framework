import Reporter from './reporter';
import store from '../result-store';
import FinishedRun from '../finished-run';
import {
  EMPTY,
} from '../constants';

const internal: Reporter = (
  results: FinishedRun,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rootDir: string,
): void => {
  let hasError = false;
  for (const id of Object.keys(results,)) {
    hasError = hasError || results[id].errors > EMPTY;
  }
  store.set(! hasError,);
};

export default internal;
