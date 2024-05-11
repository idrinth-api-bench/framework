import Cookie from '../../src/middlewares/cookie';
import {
  expect,
} from 'chai';
import 'mocha';
import Request from '../../src/routes/request';
import Result from '../../src/messaging/result';
import store from '../../src/store/store';

describe('middlewares/cookie', () => {
  before(store.clean,);
  after(store.clean,);
  it('should be a class', () => {
    expect(Cookie,).to.be.a('function',);
  },);
  it('should have a static method prepare', () => {
    expect(Cookie.prepare,).to.be.a('function',);
  },);
  it('should have a static method process', () => {
    expect(Cookie.process,).to.be.a('function',);
  },);
  it('should not set cookies by default', () => {
    expect(Cookie.prepare(<Request>{},),).to.deep.equal({
      cookies: {},
    },);
  },);
  it('should get cookies by default', () => {
    expect(() => Cookie.process(<Result><unknown>{
      response: {
        cookies: {
          abc: 'def',
        },
      },
    },),).to.not.throw();
  },);
  it('should set cookies it has', () => {
    expect(Cookie.prepare(<Request>{},),).to.deep.equal({
      cookies: {
        abc: 'def',
      },
    },);
  },);
  it('should change no cookies if there are none', () => {
    expect(() => Cookie.process(<Result><unknown>{
      response: {
        cookies: {},
      },
    },),).to.not.throw();
  },);
  it('should change no cookies if the response is incomplete', () => {
    expect(() => Cookie.process(<Result><unknown>{
      response: {},
    },),).to.not.throw();
  },);
  it('should set cookies it has', () => {
    expect(Cookie.prepare(<Request>{},),).to.deep.equal({
      cookies: {
        abc: 'def',
      },
    },);
  },);
},);
