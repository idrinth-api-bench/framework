import FinishedSet from '../messaging/finished-set.js';

export interface ReportModifier {
    adjust(result: FinishedSet): FinishedSet;
}

export default ReportModifier;
