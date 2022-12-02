
import { useState, useEffect } from 'react'
import EventMaker from '../artifacts/contracts/EventMaker.sol/EventMaker.json'
import { ethers } from 'ethers'
import { EMContractAddress } from '../utils'

export const useContract = () => {

  const [contract, setContract] = useState('')
  const [provider, setProvider] = useState('')

  useEffect(() => {

    const contractHandler = async () => {

      const alchemyProvider = new ethers.providers.AlchemyProvider("maticmum", process.env.REACT_APP_ALCHEMY_KEY);
      // const signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, alchemyProvider)
      // setContract(new ethers.Contract(momentContractAddress, Moment.abi, signer))
      setProvider(alchemyProvider)
      setContract(new ethers.Contract(EMContractAddress, EventMaker.abi, alchemyProvider))
    }

    contractHandler()
  }, [EMContractAddress])

  return [contract, provider]
}
