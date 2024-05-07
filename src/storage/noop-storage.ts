import Storage from './storage';
import FinishedSet from '../finished-set';

export default class NoopStorage implements Storage {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  store(data: FinishedSet, now: Date,): void {
  }
}
