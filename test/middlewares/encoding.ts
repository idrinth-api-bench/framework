import {
  prepare as pre,
} from '../../src/middlewares/encoding.js';
import {
  expect,
} from 'chai';
import 'mocha';
import Request from '../../src/routes/request.js';

describe('middlewares/encoding', () => {
  it('should have a static method prepare', () => {
    expect(pre,).to.be.a('function',);
  },);
  it('prepare should json-transform object to string', () => {
    expect(pre(<Request><unknown>{
      body: {
        a: 'b',
      },
      autohandle: 'json',
    },).body,).to.equal('{"a":"b"}',);
  },);
  it('prepare should json-transform array to string', () => {
    expect(pre(<Request><unknown>{
      body: [ 'a', ],
      autohandle: 'json',
    },).body,).to.equal('["a"]',);
  },);
  it('prepare should form-transform object to string', () => {
    expect(pre(<Request><unknown>{
      body: {
        a: 'b',
      },
      autohandle: 'form',
    },).body,).to.equal('a=b',);
  },);
  it('prepare should not transform by default', () => {
    expect(pre(<Request><unknown>{
      body: {},
    },).body,).to.deep.equal({},);
  },);
},);
