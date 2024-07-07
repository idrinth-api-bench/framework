import {
  readFileSync,
  existsSync,
} from 'fs';
import language from './language.js';

export interface Versioned {
  name: string;
  version: string;
}
export interface Lock extends Versioned{
  packages: {[lib: string]: Versioned};
}

let lock: Lock;

export const set = (cwd: string,) => {
  if (! existsSync(cwd + '/package-lock.json',)) {
    throw new Error(language('missing_package_lock',),);
  }
  lock = JSON.parse(readFileSync(cwd + '/package-lock.json', 'utf8',),);
};

export default (): Lock => {
  if (! lock) {
    set(process.cwd(),);
  }
  return lock;
};
