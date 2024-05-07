import {
  BASE_10_RADIX,
} from '../../constants';

const IS_NUMERIC = /^\d+$/u;

export default (value: string,) => {
  if (IS_NUMERIC.test(value,)) {
    return Number.parseInt(value, BASE_10_RADIX,);
  }
  return value;
};
