import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import EventLists from '../../components/EventLists'
import EventForm from '../../components/EventForm'

import styles from './Events.module.css'


const Events = () => {

  const location = useLocation()
  const [ showEventForm, setShowEventForm ] = useState(false)

  const eventFormHandler = (val) => {
    setShowEventForm(val)
  }

  useEffect(() => {
    if (location.state && location.state.showForm) {
      setShowEventForm(true)
    }
  }, [location])

  return (
    <div className={`app-bg ${styles['event-list-container']}`}>
      {showEventForm && (<EventForm eventForm={val => eventFormHandler(val)} />)}
      <EventLists/>
    </div>
  )
}

export default Events