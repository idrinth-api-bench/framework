import analyze from './function-analyzer.js';
import isCallable from 'is-callable';
import {
  INCLUDE_EXTENSION,
} from '../constants.js';
import language from '../helper/language.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const include = async(
  path: string,
  part: string = 'default',
): Promise<unknown> => {
  path = path
    .replace(/\/\//ug, '/',)
    .replace(/\.ts$/u, INCLUDE_EXTENSION,);
  const val = await import('file://' + path,)[part];
  if (typeof val !== 'function') {
    throw new Error(language('impossible_include', path, part,),);
  }
  if (part === 'default' && isCallable(val,)) {
    const parameters = analyze(val,);
    return val(...parameters.map((x,) => x.value,),);
  }
  return val;
};

export default include;
