import Task from './task.js';
import language from '../helper/language.js';
import {
  EMPTY,
} from '../constants.js';
import noDuplicateIds from '../validation/no-duplicate-ids.js';

const executableAmount = (
  repetitions: number,
  threads: number,
  tasks: Array<Task>,
): void => {
  if (tasks.length === EMPTY || repetitions <= EMPTY || threads <= EMPTY) {
    throw new Error(language('no_tasks',),);
  }
};

export default function validateTasks(
  repetitions: number,
  threads: number,
  tasks: Array<Task>,
): void {
  executableAmount(repetitions, threads, tasks,);
  noDuplicateIds(tasks,);
}
