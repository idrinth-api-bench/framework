import FinishedRun from '../messaging/finished-run.js';

export type Reporter = (results: FinishedRun, rootDir: string) => void;

export default Reporter;
