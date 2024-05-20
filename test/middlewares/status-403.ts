/* eslint no-magic-numbers: 0 */
import {
  process as post,
} from '../../src/middlewares/status-403.js';
import {
  expect,
} from 'chai';
import 'mocha';

describe('middlewares/status-403', () => {
  it('should have a static method process', () => {
    expect(post,).to.be.a('function',);
  },);
  for (let i=100; i<403; i ++) {
    it(`process should throw for status ${ i }`, () => {
      const input = {
        response: {
          status: i,
          headers: {},
          cookies: {},
          body: '',
          uri: '',
        },
        duration: 0,
        id: '',
        maxDuration: 0,
        validators: [],
      };
      expect(() => post(input,),).to.throw(
        `Request returned status ${ i }, not 403`,
      );
    },);
  }
  it('process should not throw for status 403', () => {
    const input = {
      response: {
        status: 403,
        headers: {},
        cookies: {},
        body: '',
        uri: '',
      },
      duration: 0,
      id: '',
      validators: [],
    };
    expect(() => post(input,),).to.not.throw();
  },);
  for (let i=404; i<1000; i ++) {
    it(`process should throw for status ${ i }`, () => {
      const input = {
        response: {
          status: i,
          headers: {},
          cookies: {},
          body: '',
          uri: '',
        },
        duration: 0,
        maxDuration: 0,
        id: '',
        validators: [],
      };
      expect(() => post(input,),).to.throw(
        `Request returned status ${ i }, not 403`,
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
