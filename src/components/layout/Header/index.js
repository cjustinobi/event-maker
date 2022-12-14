import { useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { truncate } from '../../../utils'
import { useAddress } from '../../../hooks'
import { DrawerContext } from '../../../contexts/AppContext'

import styles from './Header.module.css'

const AppHeader = () => {

  const address = useAddress()

  const location = useLocation()
  const navigate = useNavigate()

  const { drawer, setDrawer } = useContext(DrawerContext)

  const showEventForm = () => {
    navigate('/events', {
      state: { showForm: true }
    })
  }

  const connect = () => {

  }

  useEffect(() => {
    setDrawer(false)
  }, [location, setDrawer])

  return (
    <header className={`app-pd app-bg ${styles.header}`}>
      <div onClick={() => setDrawer(!drawer)} className={styles['menu-icon']}>
        <div></div>
        <div></div>
      </div>
      <div>
        <button onClick={showEventForm} className={`app-btn ${styles['create-event-btn']}`}>CREATE EVENT</button>
        {address ? <button className="app-btn">{truncate(address)}</button> : <button className="app-btn" onClick={connect}>CONNECT</button>}
      </div>
    </header>
  )

}

export default AppHeader