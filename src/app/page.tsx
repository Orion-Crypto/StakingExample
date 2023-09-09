'use client'

import clsx from 'clsx';
import { useState } from 'react';
import Image from 'next/image';
import {
    AddStakeTokenComponent,
    CreateStakeTransactionInput,
    StakeComponent,
    UnstakeComponent,
} from '../types/Transactions/StakeTransaction/CreateStakeTransactionInput';
import { GetPotentialRewardsInput } from '@/types/StakeProject/GetPotentialRewards/GetPotentialRewardsInput';
import { queryPotentialRewards, queryRemainingTokens, queryStakedNfts } from '@/api/GraphQL/StakeProject/query';
import { CreateStakeTransactionPayload } from '@/types/Transactions/StakeTransaction/CreateStakeTransactionPayload';
import { mutateCreateStakeTransaction } from '@/api/GraphQL/Transaction/Stake/mutation';

export const StakeSettings = () => {
    const [isStakingNFTs, setIsStakingNFTs] = useState(false);
    const [isUnstakingNFTs, setIsUnstakingNFTs] = useState(false);
    const [isGettingPotentialRewards, setIsGettingPotentialRewards] = useState(false);
    const [isGettingRemainingTokens, setIsGettingRemainingTokens] = useState(false);
    const [isGettingStakedNfts, setIsGettingStakedNfts] = useState(false);

    const stakeProject = "439c0ef6-2fcb-4f85-b565-7fc1f80747a7";

    const stakeNFTs = async (event: any) => {
        setIsStakingNFTs(true);
        await stakeNFT(event);
        setIsStakingNFTs(false);
    };

    const unstakeNFTs = async (event: any) => {
        setIsUnstakingNFTs(true);
        await unstakeNFT(event, stakeProject);
        setIsUnstakingNFTs(false);
    };

    const getPotentialRewards = async (event: any) => {
        setIsGettingPotentialRewards(true);
        await getPotentialRewardsFunction(event, stakeProject);
        setIsGettingPotentialRewards(false);
    };

    const getRemainingTokens = async (event: any) => {
        setIsGettingRemainingTokens(true);
        await getRemainingTokensFunction(event, stakeProject);
        setIsGettingRemainingTokens(false);
    };

    const getStakedNFTs = async (event: any) => {
        setIsGettingStakedNfts(true);
        await getStakedNFTsFunction(event, stakeProject);
        setIsGettingStakedNfts(false);
    };

    return (
        <div className="mb-12 mt-4 flex flex-col w-full">
             <div className="absolute inset-0 z-0 bg-gradient-to-b from-space-800 to-space-900">
            <Image
                src={'/images/EarthBackground.png'}
                alt="Saturn NFT"
                layout={'fill'}
                objectFit={'cover'}
                objectPosition={'center'}
                quality={100}
                priority={true}
                className="opacity-100"
            />
            </div>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-space-800 to-space-900">
                <Image
                    src={'/images/BlobParty.png'}
                    alt="Saturn NFT"
                    layout={'fill'}
                    objectFit={'cover'}
                    objectPosition={'center'}
                    quality={100}
                    priority={true}
                    className="opacity-100"
                />
            </div>
            <div className="absolute bottom-0 right-0 z-10 w-32 h-32"> {/* Adjust the position and size here */}
                <Image
                    src={'/images/Logo.png'}
                    alt="Saturn NFT"
                    layout={'fill'}
                    objectFit={'cover'}
                    objectPosition={'center'}
                    quality={100}
                    priority={true}
                    className="opacity-100"
                />
            </div>

            <div className="flex flex-col w-full justify-center text-xl font-bold z-10">
                    <div className="flex w-full flex-col items-center gap-8 rounded-lg border-0 border-lightspace-200 bg-lightspace-500 px-16 py-2 font-bold text-white drop-shadow-black-sharp">

                        <div className="flex w-full flex-col gap-4">
                            
                            <div className="mb-6 mt-3 flex flex-col gap-8 w-full justify-start">
                                <button
                                    onClick={stakeNFTs}
                                    className={clsx(
                                        'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                        'hover:bg-yellow-400',
                                        'active:bg-yellow-300'
                                    )}
                                >
                                    <div className="drop-shadow-black-sharp">{'Stake NFT'}</div>
                                </button>
                                <button
                                    onClick={unstakeNFTs}
                                    className={clsx(
                                        'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                        'hover:bg-yellow-400',
                                        'active:bg-yellow-300'
                                    )}
                                >
                                    <div className="drop-shadow-black-sharp">{'Unstake NFT'}</div>
                                </button>
                                <button
                                    onClick={getPotentialRewards}
                                    className={clsx(
                                        'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                        'hover:bg-yellow-400',
                                        'active:bg-yellow-300'
                                    )}
                                >
                                    <div className="drop-shadow-black-sharp">
                                        {'Get Potential Rewards'}
                                    </div>
                                </button>
                                <button
                                    onClick={getRemainingTokens}
                                    className={clsx(
                                        'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                        'hover:bg-yellow-400',
                                        'active:bg-yellow-300'
                                    )}
                                >
                                    <div className="drop-shadow-black-sharp">
                                        {'Get Remaining Tokens'}
                                    </div>
                                </button>
                                <button
                                    onClick={getStakedNFTs}
                                    className={clsx(
                                        'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                        'hover:bg-yellow-400',
                                        'active:bg-yellow-300'
                                    )}
                                >
                                    <div className="drop-shadow-black-sharp">
                                        {'Get Staked NFTs'}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default StakeSettings;


//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Save functions
//---------------------------------------------------------------------------//

const stakeNFT = async (event: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = "439c0ef6-2fcb-4f85-b565-7fc1f80747a7";
        const stakeComponent: StakeComponent = {
            stakeProjectId: "439c0ef6-2fcb-4f85-b565-7fc1f80747a7",
            policyId: 'b1f4ab918f6a40112aac55e56fddf5d10391bb333c8d8253a06bd29f',
            assetName: '000de140426c6f6231',
        };

        const createInput: CreateStakeTransactionInput = {
            paymentAddress: "addr_test1qpg8uwvs82jxknfkfdfv9dea2vhxe4zgagnxfms3nl5gqq2gst2av4c4typr5vszq7lwsehathdlmnyw99v75met0e0qlkrk2p",
            stakeComponents: [stakeComponent],
            unstakeComponents: [],
            addStakeTokenComponents: [],
        };

        const createTransaction: CreateStakeTransactionPayload = await mutateCreateStakeTransaction(createInput);
        console.log(createTransaction);
        return createTransaction;
    } catch (error: any) {
      console.log(error);
    }
};

const unstakeNFT = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = "439c0ef6-2fcb-4f85-b565-7fc1f80747a7";
        const unstakeComponent: UnstakeComponent = {
            stakeProjectId: stakeProjectId,
            policyId: 'b1f4ab918f6a40112aac55e56fddf5d10391bb333c8d8253a06bd29f',
            assetName: '000de140426c6f6231',
        };


        const createInput: CreateStakeTransactionInput = {
            paymentAddress: "addr_test1qpg8uwvs82jxknfkfdfv9dea2vhxe4zgagnxfms3nl5gqq2gst2av4c4typr5vszq7lwsehathdlmnyw99v75met0e0qlkrk2p",
            stakeComponents: [],
            unstakeComponents: [unstakeComponent],
            addStakeTokenComponents: [],
        };

        const createTransaction: CreateStakeTransactionPayload = await mutateCreateStakeTransaction(createInput);
        
        console.log(createTransaction);
        return createTransaction;
    } catch (error: any) {
      console.log(error);
    }
};

const getPotentialRewardsFunction = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = "439c0ef6-2fcb-4f85-b565-7fc1f80747a7";
        const getPotentialRewardsInput: GetPotentialRewardsInput = {
            stakeProjectId: '8df4d145-896e-4c1f-8130-8562a8ae3266',
            policyId: 'b1f4ab918f6a40112aac55e56fddf5d10391bb333c8d8253a06bd29f',
            assetName: '000de140426c6f6231',
        };

        const result = await queryPotentialRewards(getPotentialRewardsInput);
        console.log(result);
        return result;
    } catch (error: any) {
      console.log(error);
    }
};

const getRemainingTokensFunction = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = "439c0ef6-2fcb-4f85-b565-7fc1f80747a7";
        const getPotentialRewardsInput: GetPotentialRewardsInput = {
            stakeProjectId: stakeProjectId,
            policyId: 'b1f4ab918f6a40112aac55e56fddf5d10391bb333c8d8253a06bd29f',
            assetName: '000de140426c6f6231',
        };

        const result = await queryRemainingTokens(stakeProjectId);
        console.log(result);
        return result;
    } catch (error: any) {
      console.log(error);
    }
};

const getStakedNFTsFunction = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = "439c0ef6-2fcb-4f85-b565-7fc1f80747a7";
        const getPotentialRewardsInput: GetPotentialRewardsInput = {
            stakeProjectId: stakeProjectId,
            policyId: 'b1f4ab918f6a40112aac55e56fddf5d10391bb333c8d8253a06bd29f',
            assetName: '000de140426c6f6231',
        };

        const result = await queryStakedNfts(stakeProjectId);
        console.log(result);
        return result;
    } catch (error: any) {
      console.log(error);
    }
};
//---------------------------------------------------------------------------//
