import FinishedSet from '../finished-set';

export interface ReportModifier {
    adjust(result: FinishedSet): FinishedSet;
}

export default ReportModifier;
