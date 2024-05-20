/* eslint-disable max-len */
import {
  process as post,
} from '../../src/middlewares/failure-check.js';
import {
  expect,
} from 'chai';
import 'mocha';
import StandardResponse from '../../src/helper/standard-response.js';
import Result from '../../src/messaging/result.js';

describe('middlewares/failure-check', () => {
  it('should have a static method process', () => {
    expect(post,).to.be.a('function',);
  },);
  const bodyForSuccessResponse : Array<StandardResponse> = [
    {
      success: true,
    },
    {
      status: 'success',
    },
  ];
  for (const bodyObject of bodyForSuccessResponse) {
    const input : Result = {
      response: {
        status: 200,
        headers: {},
        cookies: {},
        body: JSON.stringify(bodyObject,),
        uri: '',
      },
      duration: 0,
      id: '',
      validators: [],
      maxDuration: 1000,
    };
    let field = 'status';
    if (! bodyObject.status) {
      field = 'success';
    }

    it(`process should throw error for ${ field } field as ${ bodyObject[field] } `,
      () => {
        expect(() => post(input, ),).to.throw(
          `The response was not failure, ${ field } field was ${ bodyObject[field] }`,
        );
      },);

  }

  const bodyForFailureResponse : Array<StandardResponse> = [
    {
      success: false,
    },
    {
      status: 'error',
    },
    {
      status: 'fail',
    },
  ];
  for (const bodyObject of bodyForFailureResponse) {
    const input : Result = {
      response: {
        status: 200,
        headers: {},
        cookies: {},
        body: JSON.stringify(bodyObject,),
        uri: '',
      },
      duration: 0,
      id: '',
      validators: [],
      maxDuration: 1000,
    };
    let field = 'status';
    if (! bodyObject.status) {
      field = 'success';
    }

    it(`process should not throw error for ${ field } field as ${ bodyObject[field] } `,
      () => {
        expect(() => post(input, ),).to.not.throw();
      },);
  }
},);
