import { SaturnError } from '../../../Classes/saturnError';

export interface GetRemainingTokensPayload {
    tokens?: string;
    error?: SaturnError;
}
