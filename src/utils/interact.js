
import { ethers } from 'ethers'
import EventMaker from '../artifacts/contracts/EventMaker.sol/EventMaker.json'

export const EMContractAddress = '0x175C30d7E709493CE2Ee0b838745Bd14437C841C'

export const iface = new ethers.utils.Interface(EventMaker.abi)
