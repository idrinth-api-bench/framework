import {
  process as post,
} from '../../src/middlewares/json-validator.js';
import {
  expect,
} from 'chai';
import 'mocha';
import Result from '../../src/messaging/result.js';

describe('middlewares/json-validator', () => {
  describe('.process()', () => {
    it('should be a function', () => {
      expect(post,).to.be.a('function',);
    },);
    it('should throw if there is no type', () => {
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
          body: '{{]]',
        },
      };
      expect(() => post(response,),)
        .to.throw('The content-type header is missing.',);
    },);
    it('should throw if the type is not json', () => {
      const response: Result = {
        id: 'example',
        validators: [],
        duration: 234242,
        response: {
          headers: {
            'content-type': 'application/jason',
          },
          cookies: {},
          uri: '',
          status: 0,
          body: '{{]]',
        },
      };
      expect(() => post(response,),)
        .to.throw(
          'The content-type application/jason is not application/json.',
        );
    },);
    it('should throw if the body is not json', () => {
      const response: Result = {
        id: 'example',
        validators: [],
        duration: 234242,
        response: {
          headers: {
            'content-type': 'application/json',
          },
          cookies: {},
          uri: '',
          status: 0,
          body: '{{]]',
        },
      };
      expect(() => post(response,),)
        .to.throw(
          'The JSON body is invalid. SyntaxError:',
        );
    },);
    it('should not throw if the body is json', () => {
      const response: Result = {
        id: 'example',
        validators: [],
        duration: 234242,
        response: {
          headers: {
            'content-type': 'application/json',
          },
          cookies: {},
          uri: '',
          status: 0,
          body: '{}',
        },
      };
      expect(() => post(response,),).to.not.throw();
    },);
  },);
},);
