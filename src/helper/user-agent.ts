import getLock, {
  Versioned,
  Lock,
} from '../helper/root-package.js';

const formatVersion = (ob: Versioned,): string => {
  if (! ob) {
    return '0.0';
  }
  if (! ob.version) {
    return '0.0';
  }
  return ob.version.replace(/\.\d+$/u, '',);
};
const getVersion = (name: string, lock: Lock,): string => {
  if (typeof lock.packages[name] === 'object') {
    return formatVersion(lock.packages[name],);
  }
  if (typeof lock.packages['node_modules/' + name] === 'object') {
    return formatVersion(lock.packages['node_modules/' + name],);
  }
  if (lock.packages[''].name === name) {
    return formatVersion(lock.packages[''],);
  }
  return '0.0';
};

const lock = getLock();
const main = `${ lock.name }/${ formatVersion(lock,) }`;
const needle = `needle/${ getVersion('needle', lock,) }`;
const name = '@idrinth-api-bench/framework';
const self = `${ name }/${ getVersion(name, lock,) }`;
export default `${ main } ${ self } ${ needle }`.replace(/ {2,}/ug, ' ',);
