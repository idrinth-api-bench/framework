import Hashmap from '../../hashmap';
import {
  FIVE,
} from '../../constants';
import Config from './config';
import {
  camelCase,
} from 'change-case';
import toValue from './to-value';

export default (config: Config, env: Hashmap,) => {
  for (const key of Object.keys(env,)) {
    if (key.startsWith('IAB_',)) {
      config[camelCase(key.substring(FIVE,),)] = toValue(env[key],);
    }
  }
};
