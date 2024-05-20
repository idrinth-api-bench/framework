import {
  process as post,
} from '../../src/middlewares/xml-validator.js';
import {
  expect,
} from 'chai';
import 'mocha';
import Result from '../../src/messaging/result.js';

describe('middlewares/xml-validator', () => {
  it('should be a function', () => {
    expect(post,).to.be.a('function',);
  },);
  it('should throw if there is no type', () => {
    const response: Result = {
      id: 'example',
      validators: [],
      maxDuration: 0,
      duration: 234242,
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
  it('should throw if the type is not xml', () => {
    const response: Result = {
      id: 'example',
      validators: [],
      duration: 234242,
      maxDuration: 0,
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
        'The content-type application/jason is not */xml.',
      );
  },);
  it('should throw if the body is not xml', () => {
    const response: Result = {
      id: 'example',
      validators: [],
      duration: 234242,
      maxDuration: 0,
      response: {
        headers: {
          'content-type': 'text/xml',
        },
        cookies: {},
        uri: '',
        status: 0,
        body: '<<>>',
      },
    };
    expect(() => post(response,),)
      .to.throw(
        'The XML body is invalid.',
      );
  },);
  it('should not throw if the body is xml', () => {
    const response: Result = {
      id: 'example',
      validators: [],
      duration: 234242,
      maxDuration: 0,
      response: {
        headers: {
          'content-type': 'text/xml',
        },
        cookies: {},
        uri: '',
        status: 0,
        body: '<s/>',
      },
    };
    expect(() => post(response,),).to.not.throw();
  },);
},);
