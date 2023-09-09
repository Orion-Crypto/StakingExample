import { SaturnError } from "@/api/Classes/saturnError";


export interface GetRemainingTokensPayload {
    tokens?: string;
    error?: SaturnError;
}
