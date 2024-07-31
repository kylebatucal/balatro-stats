import styles from '@/app/styles/sections/records.module.css'
import { Profile } from "@/app/lib/types"
import Stat from '@/app/components/stats/Stat'
import Progress from '@/app/components/sections/records/HighScores/Progress'
import { numberWithCommas } from '@/app/lib/utils'

function getMostPlayedHand(hands: Record<string, {order: string, count: number}>) {
  let highestHand = 'None'
  let highestCount = 0
  Object.values(hands).map((hand) => {
    if (hand.count > highestCount) {
      highestHand = hand.order
      highestCount = hand.count
    }
  })
  return [highestHand, highestCount]
}

function formatScore(score: number) {
  const scoreString = score.toString()
  if (scoreString.includes('e')) {
    return score.toPrecision(4).toString().replace('e+', 'e')
  } else {
    return numberWithCommas(score)
  }
}

export default function HighScores({
  profile
}: {
  profile: Profile
}) {
  const [hand, count] = getMostPlayedHand(profile.hand_usage)
  const keys: Record<string, {name: string, value: number | string, extra?: number | string, color?: string}> = {
    'hand': {
      name: profile.high_scores['hand'].label,
      value: formatScore(profile.high_scores['hand'].amt),
      color: 'red'
    },
    'furthest_round': {
      name: profile.high_scores['furthest_round'].label,
      value: profile.high_scores['furthest_round'].amt,
      color: 'orange'
    },
    'furthest_ante': {
      name: profile.high_scores['furthest_ante'].label,
      value: profile.high_scores['furthest_ante'].amt,
      color: 'orange'
    },
    'poker_hand': {
      name: profile.high_scores['poker_hand'].label,
      value: hand,
      extra: count
    },
    'most_money': {
      name: profile.high_scores['most_money'].label,
      value: `$${numberWithCommas(profile.high_scores['most_money'].amt)}`,
      color: 'yellow'
    },
    'win_streak': {
      name: profile.high_scores['win_streak'].label,
      value: numberWithCommas(profile.high_scores['win_streak'].amt),
      extra: profile.high_scores['current_streak'].amt
    },
  }

  return (
    <div className={styles.highScores}>
      <Progress progress={profile.progress} allUnlocked={profile.all_unlocked || false}/>
      {Object.keys(keys).map((key) => {
        return (
          <Stat 
            key={key} 
            name={keys[key].name}
            value={keys[key].value}

            // Optional parameters
            extra={keys[key].extra}
            color={keys[key].color}
          />
        )
      })}
    </div>
  )
}
