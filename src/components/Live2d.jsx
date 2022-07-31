import React, { useEffect } from 'react'
import clsx from 'clsx'
import store from '../store'
import images from '../assets/images'
import styles from './Live2d.module.css'

function Live2d() {
  const { live2dID } = store.useContainer()
  const id = parseInt(live2dID)
  useEffect(() => {
    let model = '/live2d/models/'
    if (id > 2 && window.loadlive2d) {
      switch (id) {
        case 3:
          model += '33'
          break
        case 4:
          model += 'wanko' // 需要调整位置
          break
        case 5:
          model += 'whitecat' // 需要调整位置
          break
        case 6:
          model += 'blackcat' // 需要调整位置
          break
        default:
          break
      }
      model += '/model.json'
      window.loadlive2d('live2d', model)
    }
  }, [id])

  const imageStyles = clsx(styles.staticImage, {
    [styles.image0]: id === 0,
    [styles.image1]: id === 1,
    [styles.image2]: id === 2,
  })
  const canvasStyles = clsx(styles.live2d, {
    [styles.wanko]: id === 4,
    [styles.cat]: id === 5 || id === 6
  })
  return (
    <React.Fragment>
      {id < 3 && id !== -1 && <img className={imageStyles} src={images[id]} alt="kanban" />}
      {id >= 3 && <div className={styles.live2dCanvasContainer}>
        <canvas id="live2d" width="400" height="400" className={canvasStyles} />
      </div>}
    </React.Fragment>
  )
}

export default Live2d