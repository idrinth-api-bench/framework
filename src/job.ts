import Task from './task';

export interface Job {
    before: Task[],
    beforeTask: Task[],
    beforeEach: Task[],
    main: Task[],
    afterEach: Task[],
    afterTask: Task[],
    after: Task[],
}
export default Job;
