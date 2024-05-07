import FinishedRun from '../finished-run';

export type Reporter = (results: FinishedRun, rootDir: string) => void;

export default Reporter;
