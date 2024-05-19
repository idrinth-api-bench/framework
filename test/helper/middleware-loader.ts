import loader from '../../src/routes/middleware-loader.js';
import {
  expect,
} from 'chai';
import 'mocha';
import url from 'url';
import {
  realpathSync,
} from 'fs';
import {
  sep,
} from 'path';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url,),);

const basedir = realpathSync(__dirname + '../..',);

describe('helper/middleware-loader', () => {
  it('should be a function', () => {
    expect(loader,).to.be.a('function',);
  },);
  it('should load by absolute path', async() => {
    expect(await loader(__dirname + '../../src/middlewares/cookie', 'post',),)
      .to.be.a('function',);
  },);
  it('should load by ^-path', async() => {
    expect(await loader('^cookie', 'post',),).to.be.a('function',);
  },);
  it('should load by ^-path and skip the default key', async() => {
    expect(await loader('^encoding', 'pre',),).to.be.a('function',);
  },);
  it('should load by #-path', async() => {
    expect(await loader('#cookie', 'pre',),).to.be.a('function',);
  },);
  it('should load by $-path', async() => {
    try {
      await loader('$needle/cookie', 'post',);
      // eslint-disable-next-line no-unused-expressions
      expect(false,).to.be.true;
    } catch (e) {
      if (sep === '/') {
        expect(`${ e }`,).to.equal(`Error: Cannot find module '${ basedir }`
          + '/node_modules/needle/src/middlewares/cookie.ts\' '
          + `imported from ${ basedir }/src/routes/include-default.ts`,);
      } else {
        expect(`${ e }`,).to.equal(`Error: Cannot find module '${ basedir }`
          + '\\node_modules\\needle\\src\\middlewares\\cookie.ts\' '
          + `imported from ${ basedir }\\src\\routes\\include-default.ts`,);
      }
    }
  },);
},);
