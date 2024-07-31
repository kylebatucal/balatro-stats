import styles from '@/app/styles/pieces.module.css'
import Tooltip from './Tooltip'
import { useContext } from 'react'
import { soundContext } from '@/app/lib/context'
import { settingsContext } from '@/app/lib/context'
import { getHighestStake } from '@/app/lib/utils'

function getChipImage(chip: string) {
  const chipOffsets: Record<string, string> = {
    'White Stake': '0 0',
    'Red Stake': '-100% 0%',
    'Green Stake': '-200% 0%',
    'Black Stake': '-400% 0%',
    'Blue Stake': '-300% 0%',
    'Purple Stake': '0 -100%',
    'Orange Stake': '-100% -100%',
    'Gold Stake': '-200% -100%',
  }
  return `url(/images/chips.png) ${chipOffsets[chip]} / 500%`
}

function Chip({
  name,
  wins,
  losses,
  beaten,
}: {
  name: string
  wins: number
  losses: number
  beaten: boolean
}) {
  const sounds = useContext(soundContext)
  const play = sounds['chipSound']

  return (
    <Tooltip name={name} wins={wins} losses={losses}>
      <div
        className={styles.chip}
        style={{
          background: getChipImage(name),
          opacity: beaten ? '1' : '0.25',
        }}
        onPointerEnter={() =>
          play({ playbackRate: Math.random() * 0.1 + 0.55 })
        }
      />
    </Tooltip>
  )
}

const stakes = {
  1: 'White Stake',
  2: 'Red Stake',
  3: 'Green Stake',
  4: 'Black Stake',
  5: 'Blue Stake',
  6: 'Purple Stake',
  7: 'Orange Stake',
  8: 'Gold Stake',
  allStakes: [1, 2, 3, 4, 5, 6, 7, 8] as const,
}

export default function Chips({
  wins,
  losses,
}: {
  wins: Record<number, number>
  losses: Record<number, number>
}) {
  const settings = useContext(settingsContext)
  const highestStake = getHighestStake(wins)

  return (
    <div className={styles.chips}>
      {stakes.allStakes.map((stake, i) => {
        const condition = settings.highlightChipsOnlyIfWin.enabled
          ? wins[stake]
          : i < highestStake

        return (
          <Chip
            key={stakes[stake]}
            name={stakes[stake]}
            wins={wins[stake] ?? 0}
            losses={losses[stake] ?? 0}
            beaten={condition ? true : false}
          />
        )
      })}
    </div>
  )
}
