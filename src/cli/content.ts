import run from '../main';
import {
  config,
} from 'dotenv';
import reqlib from 'app-root-path';
import {
  existsSync,
} from 'fs';
import {
  FIRST_ARGUMENT, ONE,
  SECOND_ARGUMENT,
} from '../constants';

export default async(args: string[],) => {
  if (existsSync(reqlib + '/.env',)) {
    config({
      path: reqlib + '/.env',
    },);
  }

  await run(
    {
      language: args[FIRST_ARGUMENT] || 'en',
      taskId: args[SECOND_ARGUMENT],
      mode: 'content-testing',
    },
    ONE,
    ONE,
  );
};
