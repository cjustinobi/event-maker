import { useState, useEffect } from 'react'

export const useAddress = () => {

  const [address, setAddress] = useState('')

  useEffect(() => {

    const getAddr = async () => {
      if (window.ethereum) {

        try {
          const addresses = await window.ethereum.request({
            method: 'eth_requestAccounts'
          })
          if (addresses.length) {
            setAddress(addresses[0])
          }

        } catch (err) {
          console.log('err ', err.message)
        }
      }
    }


    getAddr()

  })

  return address
}