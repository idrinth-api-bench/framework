import {
  process as post,
} from '../../src/middlewares/silent-server-validator.js';
import {
  expect,
} from 'chai';
import 'mocha';
import Result from '../../src/messaging/result.js';

describe('middlewares/silent-server-validator', () => {
  it('should have a static method process', () => {
    expect(post,).to.be.a('function',);
  },);
  it('process should not throw if there are no headers', () => {
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
    };
    expect(
      () => post(input as Result,),
    ).to.not.throw();
  },);
  it('process should not throw if there is a Server header', () => {
    const input = {
      response: {
        // eslint-disable-next-line no-undefined
        status: undefined,
        headers: {
          Server: 'nginx',
        },
        cookies: {},
        body: '',
        uri: '',
      },
      duration: 0,
      id: '',
      validators: [],
      maxDuration: 0,
    };
    expect(() => post(input as Result,),).to.throw(
      'The header Server is set. Remove this',
    );
  },);
  it('process should not throw if there is a X-Powered-By header', () => {
    const input = {
      response: {
        // eslint-disable-next-line no-undefined
        status: undefined,
        headers: {
          'X-Powered-By': 'php/8.1.2',
        },
        cookies: {},
        body: '',
        uri: '',
      },
      duration: 0,
      id: '',
      validators: [],
      maxDuration: 0,
    };
    expect(() => post(input as Result,),).to.throw(
      'The header X-Powered-By is set. ' +
      'It shares critical information with the world.',
    );
  },);
},);
