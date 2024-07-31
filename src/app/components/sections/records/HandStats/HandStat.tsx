import styles from '@/app/styles/stat.module.css'
import { soundContext } from '@/app/lib/context'
import { useContext } from 'react'

export default function HandStat({
  hand,
  level,
  chips,
  mult,
  usage,
}: {
  hand: string
  level: number
  chips: number
  mult: number
  usage: number
}) {
  const sounds = useContext(soundContext)
  const play = sounds['cardSound']
  const levelColor = (() => {
    switch (level) {
      case 1:
        return '#f0f0f0'
      case 2:
        return '#89a4ff'
      case 3:
        return '#53f0a7'
      case 4:
        return '#fde26f'
      case 5:
        return '#ffba3d'
      case 6:
        return '#fa6e65'
      default:
        return '#c696f0'
    }
  })()

  return (
    <div 
      className={styles.handStat}
      onPointerEnter={() => play()}
    >
      <div
        className={styles.handLevel}
        style={{
          backgroundColor: levelColor
        }}
      >
        lvl.{level}
      </div>

      <div className={styles.handName}>
        {hand}
      </div>

      <div className={styles.handRight}>
        <div className={styles.handScoring}>
          <div className={styles.handChips}>
            {chips}
          </div>
          X
          <div className={styles.handMult}>
            {mult}
          </div>
        </div>

        <div className={styles.handUsageContainer}>
          #<div className={styles.handUsage}>{usage}</div>
        </div>
      </div>
    </div>
  )
}
