import { SaturnError } from '../../Classes/saturnError';

export interface CreateStakeTransactionPayload {
    successTransactions?: SuccessTransaction[];
    failTransactions?: FailTransaction[];
    error?: SaturnError;
}
