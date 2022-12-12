import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ethers } from 'ethers'
import axios from 'axios'
import { cleanDate, EMContractAddress, iface } from '../../utils'
import { useAddress } from '../../hooks'
import Loader from '../Loader'


import styles from './EventLists.module.css'


const EventLists = () => {

  const address = useAddress()
  // const [provider] = useContract()



  const ipfsGateway = 'https://gateway.pinata.cloud/ipfs'

  const location = useLocation()

  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState([])
  const [eventPage, setEventPage] = useState(false)
  const [confirmForm, setConfirmForm] = useState(false)
  const [attendeeAddress, setAttendeeAddress] = useState('')

  const rsvp = async (eventId, deposit) => {
    try {
      if (address) {
        const data = iface.encodeFunctionData('createNewRSVP', [eventId]);

        const tx = {
          from: address,
          to: EMContractAddress,
          data,
          value: ethers.utils.formatEther(deposit)._hex,
          gasLimit: ethers.utils.hexlify(10000),
          // gasPrice: ethers.utils.hexlify(parseInt(await provider.getGasPrice()))
        }

        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [tx],
        })
        console.log(txHash)

      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const confirmAttendee = async (eventId) => {

    try {
      setLoading(true)
      const data = iface.encodeFunctionData('confirmAttendee', [ eventId, attendeeAddress ]);
      const tx = {
        from: address,
        to: EMContractAddress,
        data: data
      }

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [tx],
      });

      if (txHash) {
        console.log('res ', txHash)
        setLoading(false)
        setConfirmForm(false)
      }

    } catch (e) {
      setLoading(false)
      setConfirmForm(false)
      console.log(e)
    }

  }

  // const getEventDetails = async eventId => {
  //   const res = await EMContract.getEvent(eventId)
  //   console.log(res)
  // }

  const transfer = async eventId => {
    try {
      const data = iface.encodeFunctionData('payOut', [eventId]);

      const tx = {
        from: address,
        to: EMContractAddress,
        data,
        gasLimit: ethers.utils.hexlify(10000),
        // gasPrice: ethers.utils.hexlify(parseInt(await provider.getGasPrice()))
      }

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [tx],
      })
      console.log(txHash)
    } catch (e) {
      console.log(e)
    }
  }

  const eventList = async () => {

    setLoading(true)

    const url = `https://api.pinata.cloud/data/pinList?status=pinned`
    await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_PINATA_JWT}`
        }
      })
      .then(function (response) {
        setLoading(false)
        setEvents(response.data.rows)
      })
      .catch(function (error) {
        console.log(error)
        setLoading(false)
      })


  }


  useEffect( () => {
    //
    eventList()
    //
    if (location.pathname === '/events') {
      setEventPage(true)
    }

  }, [location.pathname])

  return (

    <>
      <div className={`${styles['event-container']}`}>
        {!loading && events.length !== 0 && events.map((event, i) => (
          <div className={eventPage ? styles['page-event-item'] : styles['event-item']} key={i}>
            <h4>{event.metadata.keyvalues.name}</h4>
            <span
              className={styles.blk}>Refundable Deposit: {ethers.utils.formatEther(event.metadata.keyvalues.deposit)} MATIC</span>
            <span className={styles.blk}>Capacity: {event.metadata.keyvalues.capacity}</span>
            <span className={styles.blk}>Date: {cleanDate(event.metadata.keyvalues.dateAndTime)}</span>
            <button className={styles['rsvp-btn']}
                    onClick={() => rsvp(event.ipfs_pin_hash, event.metadata.keyvalues.deposit)}>RSVP
            </button>
            {event.metadata.keyvalues.owner === address && (
              <div>
                {!confirmForm &&
                <button style={{width: '100%'}} onClick={() => setConfirmForm(true)}>Confirm Attendee</button>}
                <button className={'payout'} onClick={() => transfer(event.ipfs_pin_hash)}>Payout</button>
                {/*<button className={'payout'} onClick={() => getEventDetails(event.ipfs_pin_hash)}>Details</button>*/}
              </div>

            )}
            <img width="200px" src={`${ipfsGateway}/${event.ipfs_pin_hash}`} alt=""/>

            <div className={`${styles['confirm-form']} ${confirmForm && styles['show-confirm-form']}`}>
              <span className={`close-btn ${styles.cb}`} onClick={() => setConfirmForm(false)}>&#x2715;</span>

              <div className={styles.conf}>
                <input type="text" onChange={e => setAttendeeAddress(e.target.value)}/>
                <button style={{width: '100%'}} onClick={() => confirmAttendee(event.ipfs_pin_hash)}>
                  {loading ? 'Confirming ...' : 'Confirm Attendee'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <div className="loader-container"><Loader/></div>}
      {loading && events.length === 0 && <p className={styles['no-event']}>No event yet</p>}
    </>

  )
}

export default EventLists