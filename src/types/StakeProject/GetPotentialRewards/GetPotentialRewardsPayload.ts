import { SaturnError } from "@/api/Classes/saturnError";

export interface GetPotentialRewardsPayload {
    rewards?: string;
    error?: SaturnError;
}
