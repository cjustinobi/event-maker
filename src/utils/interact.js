
import { ethers } from 'ethers'
import EventMaker from '../artifacts/contracts/EventMaker.sol/EventMaker.json'

export const EMContractAddress = '0x3D9D5B208D68D2b51e4Eb73315B48a80347cd0E6'

export const iface = new ethers.utils.Interface(EventMaker.abi)
