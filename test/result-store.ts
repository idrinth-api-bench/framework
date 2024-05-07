import ResultStore from '../src/result-store';
import {
  expect,
} from 'chai';
import 'mocha';
import {
  existsSync,
  unlinkSync,
} from 'fs';
import {
  createHash,
} from 'crypto';
import {
  FRAMEWORK_ROOT,
} from '../src/constants';
import {
  tmpdir,
} from 'os';
import {
  sep,
} from 'path';

const hash = createHash('sha256',)
  .update(FRAMEWORK_ROOT,)
  .digest('hex',);
const cacheFolder: string = tmpdir() + sep + 'api-bench';

describe('result-store', () => {
  beforeEach(() => {
    if (existsSync(cacheFolder + sep + 'r' + hash,)) {
      unlinkSync(cacheFolder + sep + 'r' + hash,);
    }
  },);
  it('should have a method set', () => {
    expect(ResultStore.set,).to.be.a('function',);
  },);
  it('should have a method get', () => {
    expect(ResultStore.get,).to.be.a('function',);
  },);
  it('get() should return false by default', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(ResultStore.get(false,),).to.be.false;
  },);
  it('get() should return true after set()', () => {
    ResultStore.set(true,);
    // eslint-disable-next-line no-unused-expressions
    expect(ResultStore.get(false,),).to.be.true;
  },);
},);
