import { useState } from 'react'
import { ethers } from 'ethers'
import { EMContractAddress, iface } from '../../utils'
import { useAddress, useContract } from '../../hooks'
import EventMaker from '../../artifacts/contracts/EventMaker.sol/EventMaker.json'


import { addToIPFS } from '../../utils/ipfs'

import styles from './EventForm.module.css'

const EventForm= ({ eventForm }) => {
  const address = useAddress()
  const EMContract = useContract()

  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [maxCapacity, setMaxCapacity] = useState('')
  const [refund, setRefund] = useState('')
  const [eventLink, setEventLink] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [eventFile, setEventFile] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (address) {
      await createEvent()
    } else {

    }

  }

  const saveToIPFS = async () => {
    const eventDateAndTime = new Date(`${eventDate} ${eventTime}`)
    return await addToIPFS(
      eventName,
      ethers.utils.parseEther(refund),
      eventDateAndTime,
      eventDateAndTime.getTime(),
      maxCapacity,
      eventLink,
      eventFile,
      address
    )
  }


  const createEvent = async () => {
    setLoading(true)
    const CID = await saveToIPFS()

    let deposit = ethers.utils.parseEther(refund);
    // let deposit = refund
    let eventDateAndTime = new Date(`${eventDate} ${eventTime}`);
    let eventTimestamp = eventDateAndTime.getTime();


    try {

      const data = iface.encodeFunctionData("createNewEvent", [ eventTimestamp, deposit, maxCapacity, CID, CID ]);
      const tx = {
        from: address,
        to: EMContractAddress,
        data
      }

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [tx],
      });

      if (txHash) {
        console.log('res ', txHash)
        setLoading(false)
        eventForm(false)
        // window.location.reload()
      }

    } catch (error) {
      setLoading(false)
      eventForm(false)
      console.log("😥 " + error)
      setStatus("😥 " + error.message)
    }

    setStatus(status)
  }



  const reset = () => {
    eventForm(false)
  }



  return (
    <div className={`app-bg ${styles.container} `}>
      <form id="form" onSubmit={handleSubmit} className={styles.form}>
        <h4>{status}</h4>
        <div className="">
          <div className="">
            <label htmlFor="eventname" className="">
              Event name
            </label>
            <div className="">
              <input
                type="text"
                required
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
          </div>
          <input
            type="date"
            required
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <input type="time" required value={eventTime} onChange={(e) => setEventTime(e.target.value)}/>


          <div className={styles.grid}>
            <div className={styles.max}>
              <label>Max capacity</label>
              <input type="number" min="1" inputMode="numeric" placeholder="100" value={maxCapacity} onChange={(e) => setMaxCapacity(parseInt(e.target.value))}/>
            </div>
            <div className={styles.file}>
              <label>File</label>
              <input type="file" placeholder="file" onChange={ e => setEventFile(e.target.files[0]) }/>
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.deposit}>
              <label className="">Refundable deposit</label>
              <input
                type="text"
                placeholder="0.00"
                value={refund}
                onChange={(e) => setRefund(e.target.value)}
              />
            </div>
            <div className="">
              <label>Event link</label>
              <input type="text" className="" required value={eventLink} onChange={(e) => setEventLink(e.target.value)}/>
            </div>
          </div>
          <div className="">
            <label htmlFor="about" className="">Event description</label>
            <textarea rows={2} value={eventDescription} onChange={(e) => setEventDescription(e.target.value)}/>
          </div>
        </div>
        <div className={styles['form-btns']}>
          <button type="button" onClick={reset}>Cancel</button>
          <button type="submit" className={styles['create-btn']}>
            {loading ? 'loading ...' : 'Create'}
          </button>
        </div>
      </form>
     </div>
  )
}

export default EventForm