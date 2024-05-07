import Reporter from './reporter';
import {
  createWriteStream,
} from 'fs';
import FinishedRun from '../finished-run';

const json: Reporter = (
  results: FinishedRun,
  rootDir: string,
): void => {
  const stream = createWriteStream(rootDir + '/result.json',);
  stream.write(JSON.stringify(results,),);
  stream.end();
};

export default json;
export const JsonReporter = json;
