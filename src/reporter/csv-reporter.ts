import {
  format,
} from '@fast-csv/format';
import Reporter from './reporter';
import {
  createWriteStream,
} from 'fs';
import FinishedRun from '../finished-run';

const csv: Reporter = (
  results: FinishedRun,
  rootDir: string,
): void => {
  const csvStream = format({
    headers: true,
  },);

  csvStream.pipe(createWriteStream(rootDir + '/result.csv',),);

  for (const id of Object.getOwnPropertyNames(results,)) {
    csvStream.write({
      ...results[id],
      msgs: JSON.stringify(results[id].msgs,),
    },);
  }
  csvStream.end();
};

export default csv;
export const CsvReporter = csv;
