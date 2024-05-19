import {
  prepare as pre,
  process as post,
} from '../../src/middlewares/cookie.js';
import {
  expect,
} from 'chai';
import 'mocha';
import Request from '../../src/routes/request.js';
import Result from '../../src/messaging/result.js';
import store from '../../src/store/store.js';

describe('middlewares/cookie', () => {
  before(store.clean,);
  after(store.clean,);
  it('should have a static method prepare', () => {
    expect(pre,).to.be.a('function',);
  },);
  it('should have a static method process', () => {
    expect(post,).to.be.a('function',);
  },);
  it('should not set cookies by default', () => {
    expect(pre(<Request>{},),).to.deep.equal({
      cookies: {},
    },);
  },);
  it('should get cookies by default', () => {
    expect(() => post(<Result><unknown>{
      response: {
        cookies: {
          abc: 'def',
        },
      },
    },),).to.not.throw();
  },);
  it('should set cookies it has', () => {
    expect(pre(<Request>{},),).to.deep.equal({
      cookies: {
        abc: 'def',
      },
    },);
  },);
  it('should change no cookies if there are none', () => {
    expect(() => post(<Result><unknown>{
      response: {
        cookies: {},
      },
    },),).to.not.throw();
  },);
  it('should change no cookies if the response is incomplete', () => {
    expect(() => post(<Result><unknown>{
      response: {},
    },),).to.not.throw();
  },);
  it('should set cookies it has', () => {
    expect(pre(<Request>{},),).to.deep.equal({
      cookies: {
        abc: 'def',
      },
    },);
  },);
},);
