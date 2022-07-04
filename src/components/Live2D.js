import React from 'react'
import store from '../store'
import images from '../assets/images'
import styles from './Live2D.module.css'

function Live2D() {
  const { live2dID } = store.useContainer()
  return (
    <React.Fragment>
      {parseInt(live2dID) === 0 && <img className={styles.live2dContainer} src={images[live2dID]} alt="" style={{ right: '14px', bottom: '-6px' }} />}
      {parseInt(live2dID) === 1 && <img className={styles.live2dContainer} src={images[live2dID]} alt="" style={{ right: '3px' }} />}
      {parseInt(live2dID) === 2 && <img className={styles.live2dContainer} src={images[live2dID]} alt="" style={{ right: '6px' }} />}
    </React.Fragment>
  )
}

export default Live2D