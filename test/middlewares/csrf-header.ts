import {
  prepare as pre,
  process as post,
} from '../../src/middlewares/csrf-header.js';
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
          'x-csrf-token': 'def',
        },
      },
    },),).to.not.throw();
  },);
  it('should set token it has', () => {
    expect(pre(<Request>{},),).to.deep.equal({
      headers: {
        'x-csrf-token': 'def',
      },
    },);
  },);
  it('should change no token if there\'s none', () => {
    expect(() => post(<Result><unknown>{
      response: {
        headers: {},
      },
    },),).to.not.throw();
  },);
  it('should change no token if the response is incomplete', () => {
    expect(() => post(<Result><unknown>{
      response: {},
    },),).to.not.throw();
  },);
  it('should set token it has', () => {
    expect(pre(<Request>{},),).to.deep.equal({
      headers: {
        'x-csrf-token': 'def',
      },
    },);
  },);
},);
