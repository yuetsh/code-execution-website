import React, { useEffect } from 'react'
import store from '../store'
import images from '../assets/images'
import styles from './Live2d.module.css'

function Live2d() {
  const { live2dID } = store.useContainer()

  useEffect(() => {
    const id = parseInt(live2dID)
    let model = '/live2d/models/'
    if (id > 2) {
      switch (id) {
        case 3:
          model += '22/default'
          break
        case 4:
          model += '33/default'
          break
        case 5:
          model += '22/christmas'
          break
        case 6:
          model += '33/christmas'
          break
        case 7:
          model += 'tia'
          break
        default:
          break
      }
      model += '/model.json'
      window.loadlive2d('live2d', model)
    }
  }, [live2dID])

  return (
    <React.Fragment>
      {parseInt(live2dID) === 0 && <img className={styles.live2dContainer} src={images[0]} alt="" style={{ right: '14px', bottom: '-6px' }} />}
      {parseInt(live2dID) === 1 && <img className={styles.live2dContainer} src={images[1]} alt="" style={{ right: '3px' }} />}
      {parseInt(live2dID) === 2 && <img className={styles.live2dContainer} src={images[2]} alt="" style={{ right: '6px' }} />}
      {parseInt(live2dID) >= 3 && <div className={styles.live2dCanvasContainer}>
        <canvas id="live2d" width="400" height="400" className={styles.live2d}></canvas>
      </div>}
    </React.Fragment>
  )
}

export default Live2d