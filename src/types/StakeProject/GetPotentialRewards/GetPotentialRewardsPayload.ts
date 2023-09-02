import { SaturnError } from '../../../Classes/saturnError';

export interface GetPotentialRewardsPayload {
    rewards?: string;
    error?: SaturnError;
}
