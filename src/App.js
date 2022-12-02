import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { DrawerContext } from './contexts/AppContext'
import AppHeader from './components/layout/Header'
import Home from './pages/Home'
import Events from './pages/Events'
import './app.css'


const App = () => {

  const navigate = useNavigate()

  const [drawer, setDrawer] = useState(false)

  const showEventForm = () => {
    navigate('/events', {
      state: { showForm: true }
    })
  }

  return (
    <DrawerContext.Provider value={{drawer, setDrawer}}>
      <div>
        <div className={`${drawer ? 'show-drawer' : ''} drawer`}>
          <div className="drawer-links">
            <h1 className={`app-name app-name-drawer`}>Event Hub</h1>
            <Link to='/'>Home</Link>
            <Link to='/events'>Events</Link>
            <Link to='/rsvps'>RSVPs</Link>
            <button onClick={showEventForm} className="app-btn app-create-event-btn">Create Event</button>
            <span className="close-btn" onClick={() => setDrawer(false)}>&#x2715;</span>
          </div>
        </div>
        <AppHeader/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/events" element={<Events/>}/>
        </Routes>
      </div>
    </DrawerContext.Provider>
  )
}

export default App
