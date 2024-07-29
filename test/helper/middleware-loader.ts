import loader from '../../src/routes/middleware-loader.js';
import {
  expect,
} from 'chai';
import 'mocha';
import {
  sep,
} from 'path';

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
      const text = `${ e }`;
      // eslint-disable-next-line no-unused-expressions
      expect(text.startsWith('Error: Cannot find module ',),).to.be.true;
      if (sep === '/') {
        // eslint-disable-next-line no-unused-expressions
        expect(text.endsWith('/src/routes/include-default.ts',),).to.be.true;
      } else {
        // eslint-disable-next-line no-unused-expressions
        expect(text.endsWith('\\src\\routes\\include-default.ts',),).to.be.true;
      }
    }
  },);
},);
