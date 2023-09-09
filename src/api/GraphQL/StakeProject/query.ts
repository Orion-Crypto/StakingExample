import { GetPotentialRewardsInput } from '@/types/StakeProject/GetPotentialRewards/GetPotentialRewardsInput';
import { GetPotentialRewardsPayload } from '@/types/StakeProject/GetPotentialRewards/GetPotentialRewardsPayload';
import { GetRemainingTokensPayload } from '@/types/StakeProject/GetRemainingTokens/GetRemainingTokensPayload';
import { GetStakedNFTsPayload } from '@/types/StakeProject/GetStakedNfts/GetStakedNftsPayload';
import { gql } from 'graphql-request';
import { GraphQLClient } from 'graphql-request';

//---------------------------------------------------------------------------------------------------//
// Token Get Amount Functions
//---------------------------------------------------------------------------------------------------//
export const graphQLClient = new GraphQLClient("https://api.preprod.saturnnft.io/graphql/");
//export const graphQLClient = new GraphQLClient("https://localhost:5001/graphql/");

export const queryPotentialRewards = async (input: GetPotentialRewardsInput) => {
    const parameters = { input: input };
    const response: any = await graphQLClient.request(
        gql`
            query PotentialRewards($input: GetPotentialRewardsInput!) {
                potentialRewards(input: $input) {
                    rewards
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const getPotentialRewardsPayload: GetPotentialRewardsPayload = response?.potentialRewards;
    const getPotentialRewards: any = getPotentialRewardsPayload?.rewards || {};
    return getPotentialRewards;
};

export const queryRemainingTokens = async (id: string) => {
    if (!id) return null;
    const input = { id: id };
    const response: any = await graphQLClient.request(
        gql`
            query RemainingTokens($id: String!) {
                remainingTokens(id: $id) {
                    tokens
                    error {
                        message
                    }
                }
            }
        `,
        input
    );

    const getRemainingTokensPayload: GetRemainingTokensPayload = response?.remainingTokens;
    const getRemainingTokens: any = getRemainingTokensPayload?.tokens || {};
    return getRemainingTokens;
};

export const queryStakedNfts = async (id: string) => {
    if (!id) return null;
    const input = { id: id };
    const response: any = await graphQLClient.request(
        gql`
            query StakedNfts($id: String!) {
                stakedNfts(id: $id) {
                    nfts {
                        policyId
                        assetName
                        rewardsAccumulated
                        daysStaked
                    }
                    error {
                        message
                    }
                }
            }
        `,
        input
    );

    const getStakedNftsPayload: GetStakedNFTsPayload = response?.stakedNfts;
    const getStakedNfts: any = getStakedNftsPayload?.nfts || {};
    return getStakedNfts;
};

//---------------------------------------------------------------------------------------------------//
