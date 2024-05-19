import {
  prepare as pre,
} from '../../src/middlewares/user-agent.js';
import {
  expect,
} from 'chai';
import 'mocha';
import Request from '../../src/routes/request.js';

describe('middlewares/user-agent', () => {
  it('should have a static method prepare', () => {
    expect(pre,).to.be.a('function',);
  },);
  it('prepare should add a user agent header', () => {
    expect(pre(<Request>{},).headers['user-agent'],).to.be.a(
      'string',
    );
  },);
},);
