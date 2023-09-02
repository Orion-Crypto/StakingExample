import { SaturnError } from '../../Classes/saturnError';

export interface SubmitStakeTransactionPayload {
    transactionIds?: string[];
    error?: SaturnError;
}
