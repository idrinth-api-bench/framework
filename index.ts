import {
  Reporter as R,
} from './src/reporter/reporter';
import {
  CliReporter as CliR,
} from './src/reporter/console-reporter';
import {
  CsvReporter as CsvR,
} from './src/reporter/csv-reporter';
import {
  HtmlReporter as HR,
} from './src/reporter/html-reporter';
import {
  JsonReporter as JR,
} from './src/reporter/json-reporter';
import {
  MultiReporter as MR,
} from './src/reporter/multi-reporter';
import {
  Wrapper as LW,
} from './src/logger/wrapper';
import {
  WinstonWrapper as WLW,
} from './src/logger/winston-wrapper';
import {
  PinoWrapper as PLW,
} from './src/logger/pino-wrapper';
import {
  Logger as L,
} from './src/logger/logger';
import {
  DurationFloatsToInts as DFTIRM,
} from './src/report-modifier/duration-floats-to-ints';
import {
  DurationsTimeScaleReduction as DTSRRM,
} from './src/report-modifier/durations-time-scale-reduction';
import {
  ReportModifier as RM,
} from './src/report-modifier/report-modifier';
import {
  Storage as S,
} from './src/storage/storage';
import {
  MysqlStorage as MYSQLS,
} from './src/storage/mysql-storage';
import {
  MssqlStorage as MSSQLS,
} from './src/storage/mssql-storage';
import {
  PostgresStorage as PGSQL,
} from './src/storage/postgres-storage';
import {
  Job as J,
} from './src/job';
import {
  Task as T,
} from './src/task';
import {
  run as r,
} from './src/main';
import rS from './src/result-store';
import iR from './src/reporter/internal-reporter';

export type Reporter = R;
export const CliReporter = CliR;
export const CsvReporter = CsvR;
export const HtmlReporter = HR;
export const JsonReporter = JR;
export const MultiReporter = MR;
export type Logger = L;
export const WinstonLoggerWrapper = WLW;
export const PinoLoggerWrapper = PLW;
export const LoggerWrapper = LW;
export type ReportModifier = RM;
export type DurationFloatsToIntsReportModifier = DFTIRM;
export type DurationsTimeScaleReductionReportModifier = DTSRRM;
export type Storage = S;
export const MysqlStorage = MYSQLS;
export const MssqlStorage = MSSQLS;
export const PostgresStorage = PGSQL;
export type Job = J;
export type Task = T;
export const internalReporter = iR;
export const resultStore = rS;
export const run = r;
export default r;
