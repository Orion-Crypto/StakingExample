import { SaturnError } from '../Classes/saturnError';

export interface TransactionResult {
    transactionIds?: string[];
    error?: SaturnError;
}
