import styles from '@/app/styles/sections/footer.module.css'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <a 
        className={styles.link}
        href='https://github.com/kylebatucal/Balatro-Stats'
      >
        view code on GitHub
      </a>
    </div>
  )
}
