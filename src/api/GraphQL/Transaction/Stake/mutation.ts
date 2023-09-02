import { GraphQLClient, gql } from 'graphql-request';
import { CreateStakeTransactionInput } from '../../../../types/Transactions/StakeTransaction/CreateStakeTransactionInput';
import { CreateStakeTransactionPayload } from '../../../../types/Transactions/StakeTransaction/CreateStakeTransactionPayload';
import { SubmitStakeTransactionInput } from '../../../../types/Transactions/StakeTransaction/SubmitStakeTransactionInput';
import { SubmitStakeTransactionPayload } from '../../../../types/Transactions/StakeTransaction/SubmitStakeTransactionPayload';

//---------------------------------------------------------------------------------------------------//
// Stake Transaction Functions
//---------------------------------------------------------------------------------------------------//
export const graphQLClient = new GraphQLClient("https://api.preprod.saturnnft.io/graphql/");
//export const graphQLClient = new GraphQLClient("https://localhost:5001/graphql/");

export const mutateCreateStakeTransaction = async (input: CreateStakeTransactionInput) => {
    const parameters = { input: input };
    const response: any = await graphQLClient.request(
        gql`
            mutation CreateStakeTransaction($input: CreateStakeTransactionInput!) {
                createStakeTransaction(input: $input) {
                    successTransactions {
                        transactionId
                        hexTransaction
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const createStakeTransactionPayload: CreateStakeTransactionPayload = response?.createStakeTransaction || {};
    return createStakeTransactionPayload;
};

export const mutateSubmitStakeTransaction = async (input: SubmitStakeTransactionInput) => {
    const parameters = { input: input };
    const response: any = await graphQLClient.request(
        gql`
            mutation SubmitStakeTransaction($input: SubmitStakeTransactionInput!) {
                submitStakeTransaction(input: $input) {
                    transactionIds
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const submitStakeTransactionPayload: SubmitStakeTransactionPayload = response?.submitStakeTransaction || {};
    return submitStakeTransactionPayload;
};
//---------------------------------------------------------------------------------------------------//
