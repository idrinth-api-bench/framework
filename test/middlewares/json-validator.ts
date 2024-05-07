import JsonValidator from '../../src/middlewares/json-validator';
import {
  expect,
} from 'chai';
import 'mocha';
import Result from '../../src/result';

describe('middlewares/json-validator', () => {
  it('should be a class', () => {
    expect(JsonValidator,).to.be.a('function',);
  },);
  describe('.prepare()', () => {
    it('should be a function', () => {
      expect(JsonValidator.prepare,).to.be.a('function',);
    },);
    it('should return the unchanged param', () => {
      const param = {
        method: 'get',
        url: 'https://localhost',
      };
      expect(JsonValidator.prepare(param,),).to.be.equal(param,);
    },);
  },);
  describe('.process()', () => {
    it('should be a function', () => {
      expect(JsonValidator.process,).to.be.a('function',);
    },);
    it('should throw if there is no type', () => {
      const response: Result = {
        id: 'example',
        validators: [],
        duration: 234242,
        response: {
          headers: {},
          cookies: {},
          uri: '',
          status: 0,
          body: '{{]]',
        },
      };
      expect(() => JsonValidator.process(response,),)
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
      expect(() => JsonValidator.process(response,),)
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
      expect(() => JsonValidator.process(response,),)
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
      expect(() => JsonValidator.process(response,),).to.not.throw();
    },);
  },);
},);
