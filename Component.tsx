import React, { useState } from 'react';
import { useWeb3ModalState } from '@web3modal/wagmi/react' // To get chain ID
import { useContractWrite, usePrepareContractWrite } from 'wagmi'


const commitmentFactoryAddress = "0xE435FB5dA9F14F36239c04E267c4f87Bd770D567";
import commitmentFactoryContract from "../../artifacts/src/contracts/commitmentFactory.sol/CommitmentFactory.json";

const CreateCommitment: React.FC = () => {

    // const { open, selectedNetworkId } = useWeb3ModalState()
    // console.log(open, selectedNetworkId)

    const membersAddress = ["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4","0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db" ]

    
    const { config } = usePrepareContractWrite({
        address: commitmentFactoryAddress,
        abi: commitmentFactoryContract.abi,
        functionName: 'createCommitment',
        args: [membersAddress, 500,120,480],
    })

    console.log(config)

    return (
        <div>
            <h1>hello</h1>
            <button onClick={() => console.log("hi") }>
                Create Commitment
            </button>
        </div>
    );
};

export default CreateCommitment;
