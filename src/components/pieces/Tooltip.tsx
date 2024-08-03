import styles from './pieces.module.css'

export default function Tooltip({
  children,
  name,
  wins,
  losses,
  rounds,
  status,
  translateY,
  desc,
}: {
  children: React.ReactNode
  name?: string
  wins?: number
  losses?: number
  rounds?: number
  status?: string
  translateY?: number
  desc?: string
}) {
  const roundNoun = (() => {
    const plural = rounds != 1
    switch (status) {
      case 'Tarot':
      case 'Planet':
      case 'Spectral':
        return plural ? 'uses' : 'use'
      case 'Voucher':
        return plural ? 'redeems' : 'redeem'
      default:
        return plural ? 'rounds' : 'round'
    }
  })()
  let statusText = status
  if (name) {
    if (['Pluto', 'Ceres', 'Eris'].includes(name)) {
      statusText = 'Dwarf Planet'
    } else if (name == 'Planet X') {
      statusText = 'Planet?'
    }
  }

  return (
    <div
      className={styles.tooltipWrapper}
      style={{
        transform: translateY ? `translateY(${translateY}rem)` : '',
      }}
    >
      <div className={styles.tooltip}>
        {name && <p className={styles.tooltipTitle}>{name}</p>}

        <div className={styles.tooltipDesc}>
          {wins != undefined && (
            <p>
              <span className={styles.tooltipStat}>{wins}</span>{' '}
              {wins != 1 ? 'wins' : 'win'}
            </p>
          )}

          {losses != undefined && (
            <p>
              <span className={styles.tooltipStat}>{losses}</span>{' '}
              {losses != 1 ? 'losses' : 'loss'}
            </p>
          )}

          {rounds != undefined && (
            <p>
              <span className={styles.tooltipStat}>{rounds}</span> {roundNoun}
            </p>
          )}

          {desc && <p>{desc}</p>}
        </div>

        {status && (
          <div
            className={styles.tooltipStatus}
            style={{
              backgroundColor: `var(--${status})`,
              boxShadow: `0 var(--shadow-length) 0 color-mix(in srgb, var(--${status}), var(--shadow))`,
            }}
          >
            {statusText}
          </div>
        )}
      </div>

      <div className={styles.tooltipItem}>{children}</div>
    </div>
  )
}
