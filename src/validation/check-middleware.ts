import Task from '../routes/task.js';
import error from './error.js';

// eslint-disable-next-line complexity
const checkMiddleware = (
  type: 'pre' | 'post',
  route: Task,
) => {
  if (typeof route[type] === 'undefined') {
    return true;
  }
  const data = route[type];
  delete route[type];
  if (typeof data !== 'object' || ! Array.isArray(data,)) {
    error(`invalid_${ type }_definition`, route.id,);
    return false;
  }
  for (const middleware of data) {
    if (typeof middleware !== 'string') {
      error(`invalid_${ type }_definition`, route.id,);
      return false;
    }
  }
  return true;
};

export default checkMiddleware;
