/* eslint no-magic-numbers: 0 */
import {
  process as post,
} from '../../src/middlewares/status-2xx.js';
import {
  expect,
} from 'chai';
import 'mocha';

describe('middlewares/status-2xx', () => {
  it('should have a static method process', () => {
    expect(post,).to.be.a('function',);
  },);
  for (let i=0; i<100; i ++) {
    it(`process should throw for status ${ 100+i }`, () => {
      const input = {
        response: {
          status: 100+i,
          headers: {},
          cookies: {},
          body: '',
          uri: '',
        },
        duration: 0,
        id: '',
        validators: [],
        maxDuration: 0,
      };
      expect(() => post(input,),).to.throw(
        'Request returned status below 200-299 range',
      );
    },);
  }
  for (let i=0; i<100; i ++) {
    it(`process should not throw for status ${ 200+i }`, () => {
      const input = {
        response: {
          status: 200+i,
          headers: {},
          cookies: {},
          body: '',
          uri: '',
        },
        duration: 0,
        id: '',
        validators: [],
        maxDuration: 0,
      };
      expect(() => post(input,),).to.not.throw();
    },);
  }
  for (let i=0; i<700; i ++) {
    it(`process should throw for status ${ 300+i }`, () => {
      const input = {
        response: {
          status: 300+i,
          headers: {},
          cookies: {},
          body: '',
          uri: '',
        },
        duration: 0,
        id: '',
        validators: [],
        maxDuration: 0,
      };
      expect(() => post(input,),).to.throw(
        'Request returned status above 200-299 range',
      );
    },);
  }
  it('process should throw for undefined status', () => {
    const input = {
      response: {
        // eslint-disable-next-line no-undefined
        status: undefined,
        headers: {},
        cookies: {},
        body: '',
        uri: '',
      },
      duration: 0,
      id: '',
      validators: [],
      maxDuration: 0,
    };
    expect(() => post(input,),).to.throw(
      'Request returned no status',
    );
  },);
},);
