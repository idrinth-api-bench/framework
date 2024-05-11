import Job from '../routes/job.js';

interface Progress {
    start(job: Job, repetitions: number, threads: number): void;
    stop(): void;
    increment(): void;
}

export default Progress;
