export interface CreateStakeTransactionInput {
    paymentAddress: string;
    // Separate component lists for transaction types
    stakeComponents?: StakeComponent[];
    unstakeComponents?: UnstakeComponent[];
    addStakeTokenComponents?: AddStakeTokenComponent[];

    utxos?: string[];
}

export interface StakeComponent {
    stakeProjectId?: string;
    policyId?: string;
    assetName?: string;
}

export interface UnstakeComponent {
    stakeProjectId?: string;
    policyId?: string;
    assetName?: string;
}

export interface AddStakeTokenComponent {
    stakeProjectId?: string;
    policyId?: string;
    assetName?: string;
    amount?: number;
}

export interface GetNftRewardsComponent {
    stakeProjectId?: string;
    policyId?: string;
    assetName?: string;
}
