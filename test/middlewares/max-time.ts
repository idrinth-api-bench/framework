import {
  process as post,
} from '../../src/middlewares/max-time.js';
import {
  expect,
} from 'chai';
import 'mocha';
import Result from '../../src/messaging/result.js';

describe('middlewares/max-time', () => {
  describe('.process()', () => {
    it('should be a function', () => {
      expect(post,).to.be.a('function',);
    },);
    it('should throw if the response is too slow', () => {
      const response: Result = {
        id: 'example',
        validators: [],
        duration: 234242,
        maxDuration: 193,
        response: {
          headers: {},
          cookies: {},
          uri: '',
          status: 0,
          body: '',
        },
      };
      expect(() => post(response,),)
        .to.throw(
          'The response time was above 193 ns',
        );
    },);
    it('should not throw if the response is fast enough', () => {
      const response: Result = {
        id: 'example',
        validators: [],
        duration: 234242,
        maxDuration: 234242,
        response: {
          headers: {},
          cookies: {},
          uri: '',
          status: 0,
          body: '',
        },
      };
      expect(() => post(response,),).to.not.throw();
    },);
    it('should not throw if there is no max time', () => {
      const response: Result = {
        id: 'example',
        validators: [],
        duration: 234242,
        // eslint-disable-next-line no-undefined
        maxDuration: undefined,
        response: {
          headers: {},
          cookies: {},
          uri: '',
          status: 0,
          body: '',
        },
      };
      expect(() => post(response,),).to.not.throw();
    },);
  },);
},);
