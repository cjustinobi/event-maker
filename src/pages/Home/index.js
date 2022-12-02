
import { useNavigate } from 'react-router-dom'
import Events from '../../components/EventLists'
import { useContract, useAddress } from '../../hooks'

import uspImg from '../../assets/img/usp-img.png'

import styles from './Home.module.css'


const Home = () => {

  const navigate = useNavigate()

  const EMContract = useContract()
  const address = useAddress()

  const getTime = async () => {

    // const txHash = await momentContract.test()
    // const txHash = await momentContract.getBlockTime()
    const txHash = await EMContract.getEventLength()
    // console.log(txHash)
    // return console.log(txHash)
    return console.log(txHash.toNumber())



  }

  return (
    <div className={styles.container}>
      <div className={`app-bg ${styles.hero}`}>
        <h1 className={'app-name'}>Event <br/>Maker</h1>
          <button style={{color: 'white'}} onClick={getTime}>Get time</button>

      </div>
      <div className={`app-bg app-pd ${styles.usp}`}>
        <div className={styles['usp-txt']}>
          <h2>Get rewarded for attending events</h2>
          <p>Get refunded for attending while you share from a pool of event absentees. It is that simple!</p>
        </div>
        <img src={uspImg} alt="usp"/>
      </div>

      <div className={`app-bg ${styles.events}`}>
        <h1>Upcoming Events</h1>
        <Events/>
        <div className={styles['button-container-div']}>
          <button onClick={() => navigate('/events')} className="app-btn">VIEW MORE</button>
        </div>
      </div>
    </div>
  )
}

export default Home