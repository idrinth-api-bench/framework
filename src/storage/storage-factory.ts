import MysqlStorage from './mysql-storage';
import PostgresStorage from './postgres-storage';
import MssqlStorage from './mssql-storage';
import NoopStorage from './noop-storage';
import Config from '../cli/config/config';
import Storage from './storage';

// eslint-disable-next-line complexity
export default (config: Config,): Storage => {
  switch (config.database) {
    case 'mysql':
      return new MysqlStorage(
        config.databaseHost,
        config.databasePassword,
        config.databasePort,
        config.databaseUser ?? 'idrinth-api-bench',
        config.databaseDatabase ?? 'idrinth-api-bench',
      );
    case 'postgres':
      return new PostgresStorage(
        config.databaseHost,
        config.databasePassword,
        config.databasePort,
        config.databaseUser ?? 'idrinth-api-bench',
        config.databaseDatabase ?? 'idrinth-api-bench',
      );
    case 'mssql':
      return new MssqlStorage(
        config.databaseHost,
        config.databasePassword,
        config.databasePort,
        config.databaseDriver,
        config.databaseUser ?? 'idrinth-api-bench',
        config.databaseDatabase ?? 'idrinth-api-bench',
        config.databaseTrustedConnection === 'true',
      );
    default:
      if (config.database) {
        throw new Error(`Database type ${ config.database } is unknown.`,);
      }
      return new NoopStorage();
  }
};
