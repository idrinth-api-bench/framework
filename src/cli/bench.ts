import run from '../main';
import {
  config,
} from 'dotenv';
import reqlib from 'app-root-path';
import {
  existsSync,
} from 'fs';
import {
  BASE_10_RADIX,
  FIRST_ARGUMENT,
  FOURTH_ARGUMENT,
  SECOND_ARGUMENT,
  THIRD_ARGUMENT,
} from '../constants';

export default async(args: string[],) => {
  const threads = Number.parseInt(
    args[FIRST_ARGUMENT] || '1',
    BASE_10_RADIX,
  );
  const repeats = Number.parseInt(
    args[SECOND_ARGUMENT] || '1',
    BASE_10_RADIX,
  );

  if (existsSync(reqlib + '/.env',)) {
    config({
      path: reqlib + '/.env',
    },);
  }

  await run(
    {
      language: args[THIRD_ARGUMENT] || 'en',
      taskId: args[FOURTH_ARGUMENT],
    },
    threads,
    repeats,
  );
};
