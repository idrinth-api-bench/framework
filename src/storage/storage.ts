import FinishedSet from '../finished-set';

export interface Storage
{
    store(data: FinishedSet, now: Date): void;
}

export default Storage;
