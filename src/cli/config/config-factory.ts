import Hashmap from '../../hashmap';
import {
  DEFAULT_REPETITIONS,
  DEFAULT_THREADS,
  FIRST_ARGUMENT,
} from '../../constants';
import Config from './config';
import fromEnv from './from-env';
import fromCli from './from-cli';

export default (cwd: string, args: string[], env: Hashmap,) => {
  const config: Config = {
    cwd,
    threads: DEFAULT_THREADS,
    repetitions: DEFAULT_REPETITIONS,
    task: args.filter(
      (arg,) => ! arg.startsWith('--',),
    )[FIRST_ARGUMENT] || 'help',
  };
  fromEnv(config, env,);
  fromCli(config, args,);
  return config;
};
