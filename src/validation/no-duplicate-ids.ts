import Task from '../routes/task.js';
import language from '../helper/language.js';

const noDuplicateIds = (tasks: Array<Task>,) => {
  const ids: Array<string> = [];
  for (const task of tasks) {
    if (ids.includes(task.id,)) {
      throw new Error(language('duplicate_task_id', task.id,),);
    }
    ids.push(task.id,);
  }
};
export default noDuplicateIds;
