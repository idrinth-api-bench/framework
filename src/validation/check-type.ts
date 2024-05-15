import Job from '../job.js';
import taskType from '../task-type.js';
import {
  EMPTY,
} from '../constants.js';
import checkRequest from './check-request.js';
import warn from './warn.js';
import checkMiddleware from './check-middleware.js';

const checkType = (job: Job, type: taskType,) => {
  if (typeof job[type] === 'undefined') {
    return {
      errors: 0,
      warnings: 0,
    };
  }
  let errors = 0;
  let warnings = 0;
  if (job[type].length > EMPTY) {
    for (const route of job[type]) {
      if (! checkMiddleware('pre', route,)) {
        errors ++;
      }
      if (! checkMiddleware('post', route,)) {
        errors ++;
      }
      const id = route.id;
      delete route.id;
      const result = checkRequest(route.main, id,);
      if (result.invalid) {
        errors ++;
      }
      if (result.risky) {
        warnings ++;
      }
      delete route.main;
      for (const key of Object.keys(route,)) {
        warn('unknown_route_property', key, id,);
        warnings ++;
      }
    }
  }
  return {
    errors,
    warnings,
  };
};

export default checkType;
