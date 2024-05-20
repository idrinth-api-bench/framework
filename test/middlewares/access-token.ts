import {
  prepare as pre,
  process as post,
} from '../../src/middlewares/access-token.js';
import {
  expect,
} from 'chai';
import 'mocha';
import Request from '../../src/routes/request.js';
import Result from '../../src/messaging/result.js';
import store from '../../src/store/store.js';

describe('middlewares/csrf-header', () => {
  before(store.clean,);
  after(store.clean,);
  it('should have a static method prepare', () => {
    expect(pre,).to.be.a('function',);
  },);
  it('should have a static method process', () => {
    expect(post,).to.be.a('function',);
  },);
  it('should not set token by default', () => {
    expect(pre(<Request>{},),).to.deep.equal({},);
  },);
  it('should get token by default', () => {
    expect(() => post(<Result><unknown>{
      response: {
        headers: {
          'content-type': 'application/json',
        },
        body: '{"access":"11"}',
      },
    },),).to.not.throw();
  },);
  it('should set token it has', () => {
    expect(pre(<Request>{},),).to.deep.equal({
      headers: {
        'authorization': 'Bearer 11',
      },
    },);
  },);
  it('should change no token if the response is incomplete', () => {
    expect(() => post(<Result><unknown>{
      response: {},
    },),).to.not.throw();
  },);
  it('should set token it has', () => {
    expect(pre(<Request>{},),).to.deep.equal({
      headers: {
        'authorization': 'Bearer 11',
      },
    },);
  },);
  it('should get refresh-token by default', () => {
    expect(() => post(<Result><unknown>{
      response: {
        headers: {
          'content-type': 'application/json',
        },
        body: '{"refresh-token":"1k"}',
      },
    },),).to.not.throw();
  },);
  it('should set all tokens it has', () => {
    expect(pre(<Request>{
      body: '%refresh-token-middleware%%access-token-middleware%',
    },),).to.deep.equal({
      headers: {
        'authorization': 'Bearer 11',
      },
      body: '1k11',
    },);
  },);
},);
