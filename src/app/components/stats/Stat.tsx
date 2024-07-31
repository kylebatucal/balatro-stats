import styles from '@/app/styles/stat.module.css'

export default function Stat({
  name,
  value,
  extra,
  color,
  bar
}: {
  name: string
  value: string | number
  color?: string
  extra?: string | number
  bar?: {percentage: number; allUnlocked: boolean}
}) {
  return (
    <div
      className={styles.stat}
      style={{
        backgroundColor: name == 'Progress' ? 'transparent' : '',
        boxShadow: name == 'Progress' ? 'none' : ''
      }}
    >
      <div className={styles.statName}>{name}</div>
      <div className={styles.statBox}>
        <div 
          className={styles.statBackground}
          style={{
            padding: name == 'Progress' ? '0.8rem' : '0.9rem'
          }}
        />

        <div
          className={styles.statBar}
          style={{
            padding: name == 'Progress' ? '0.8rem 0' : '0.9rem 0',
            backgroundColor: bar?.allUnlocked ? '#8f3b3b' : '#005e97',
            width: bar?.percentage ? `${bar?.percentage}%` : '0',
            transition: 'width 900ms ease',
          }}
        />

        <div 
          className={styles.statValue}
          style={{
            color: `var(--${color})`
          }}
        >
          {name == 'Best Hand' && <div
            style={{
              backgroundImage: 'url(/images/chip.png)',
              backgroundSize: '100%',
              aspectRatio: 1/1,
              height: '1rem', // coincidentally happens to be 1 rem
            }}
          />}
          {value}{' '}
          <span className={styles.statExtra}>{extra !== undefined ? `(${extra})` : ''}</span>
        </div>
      </div>
    </div>
  )
}