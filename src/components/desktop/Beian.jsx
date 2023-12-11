import styles from "./Beian.module.css"

function Beian() {
  return (
    <div className={styles.beian}>
      <a
        className={styles.beianLink}
        href="https://beian.miit.gov.cn"
        target="_blank"
        rel="noreferrer"
      >
        浙ICP备2023044109号
      </a>
      <img className={styles.beianImg} src="/备案图标.png" alt="备案图标" />
      <a
        className={styles.beianLink}
        href="https://beian.mps.gov.cn/#/query/webSearch?code=33100402331786"
        rel="noreferrer"
        target="_blank"
      >
        浙公网安备33100402331786
      </a>
    </div>
  )
}

export default Beian
