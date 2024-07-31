import styles from '@/app/styles/sections/records.module.css'
import { Profile } from '@/app/lib/types'
import Stat from '@/app/components/stats/Stat'
import { numberWithCommas } from '@/app/lib/utils'
import { useContext } from 'react'
import { settingsContext } from '@/app/lib/context'
import { planetKeys, spectralKeys, tarotKeys } from '../../../../lib/cards/cardKeys'

export default function CareerStats({
  profile
}: {
  profile: Profile
}) {
  const settings = useContext(settingsContext)

  interface StatType {
    name: string
    value: number
    perGame: boolean
    color: string
    type: 'number' | 'money' | 'percentage'
  }

  const stats: Record<string, StatType> = {
    'c_cards_discarded': {
      name: 'Cards Discarded',
      value: 0,
      perGame: true,
      color: 'red',
      type: 'number'
    },
    'c_cards_played': {
      name: 'Cards Played',
      value: 0,
      perGame: true,
      color: 'blue',
      type: 'number'
    },
    'c_cards_sold': {
      name: 'Cards Sold',
      value: 0,
      perGame: true,
      color: 'white',
      type: 'number'
    },
    'c_dollars_earned': {
      name: 'Total Money Earned',
      value: 0,
      perGame: true,
      color: 'yellow',
      type: 'money'
    },
    'c_face_cards_played': {
      name: 'Face Cards Played',
      value: 0,
      perGame: true,
      color: 'white',
      type: 'number'
    },
    'c_hands_played': {
      name: 'Hands Played',
      value: 0,
      perGame: true,
      color: 'white',
      type: 'number'
    },
    'c_jokers_sold': {
      name: 'Jokers Sold',
      value: 0,
      perGame: true,
      color: 'white',
      type: 'number'
    },
    'c_losses': {
      name: 'Losses',
      value: 0,
      perGame: false,
      color: 'red',
      type: 'number'
    },
    'c_planetarium_used': {
      name: 'Celestial Packs Used',
      value: 0,
      perGame: true,
      color: 'Planet',
      type: 'number'
    },
    'c_planets_bought': {
      name: 'Planets Purchased',
      value: 0,
      perGame: true,
      color: 'Planet',
      type: 'number'
    },
    'c_playing_cards_bought': {
      name: 'Playing Cards Purchased',
      value: 0,
      perGame: true,
      color: 'white',
      type: 'number'
    },
    'c_round_interest_cap_streak': {
      name: 'Current Max Interest Streak',
      value: 0,
      perGame: false,
      color: 'white',
      type: 'number'
    },
    'c_rounds': {
      name: 'Rounds Played',
      value: 0,
      perGame: true,
      color: 'orange',
      type: 'number'
    },
    'c_shop_dollars_spent': {
      name: 'Total Money Spent',
      value: 0,
      perGame: true,
      color: 'yellow',
      type: 'money'
    },
    'c_shop_rerolls': {
      name: 'Times Rerolled',
      value: 0,
      perGame: true,
      color: 'green',
      type: 'number'
    },
    'c_single_hand_round_streak': {
      name: 'Current Consecutive Single Hand Round Wins',
      value: 0,
      perGame: false,
      color: 'white',
      type: 'number'
    },
    'c_tarot_reading_used': {
      name: 'Tarot Packs Used',
      value: 0,
      perGame: true,
      color: 'Tarot',
      type: 'number'
    },
    'c_tarots_bought': {
      name: 'Tarot Cards Purchased',
      value: 0,
      perGame: true,
      color: 'Tarot',
      type: 'number'
    },
    'c_vouchers_bought': {
      name: 'Vouchers Redeemed',
      value: 0,
      perGame: true,
      color: 'Voucher',
      type: 'number'
    },
    'c_wins': {
      name: 'Wins',
      value: 0,
      perGame: false,
      color: 'blue',
      type: 'number'
    },
    'win_percentage': {
      name: 'Win %',
      value: 0,
      perGame: false,
      color: 'orange',
      type: 'percentage'
    },
    'gold_stake_wins': {
      name: 'Gold Stake Wins',
      value: 0,
      perGame: false,
      color: 'blue',
      type: 'number'
    },
    'gold_stake_losses': {
      name: 'Gold Stake Losses',
      value: 0,
      perGame: false,
      color: 'red',
      type: 'number'
    },
    'gold_stake_win_percentage': {
      name: 'Gold Stake Win %',
      value: 0,
      perGame: false,
      color: 'orange',
      type: 'percentage'
    },
    'total_tarots_used': {
      name: 'Tarot Cards Used',
      value: 0,
      perGame: true,
      color: 'Tarot',
      type: 'number'
    },
    'total_planets_used': {
      name: 'Planet Cards Used',
      value: 0,
      perGame: true,
      color: 'Planet',
      type: 'number'
    },
    'total_spectrals_used': {
      name: 'Spectral Cards Used',
      value: 0,
      perGame: true,
      color: 'Spectral',
      type: 'number'
    },
    'total_consumables_used': {
      name: 'Consumables Used',
      value: 0,
      perGame: true,
      color: 'White',
      type: 'number'
    }
  }

  const sections = {
    'Record': ['c_wins', 'c_losses', 'win_percentage', 'c_rounds', ],
    'Gold Stake': ['gold_stake_wins', 'gold_stake_losses', 'gold_stake_win_percentage'],
    'Cards': ['c_cards_played', 'c_cards_discarded', 'c_face_cards_played', 'c_hands_played'],
    'Economy': ['c_dollars_earned', 'c_shop_dollars_spent', 'c_playing_cards_bought', 'c_cards_sold', 'c_jokers_sold', 'c_shop_rerolls'],
    'Consumables': ['c_tarot_reading_used', 'c_tarots_bought', 'total_tarots_used', 'c_planetarium_used', 'c_planets_bought', 'total_planets_used', 'total_spectrals_used', 'total_consumables_used', 'c_vouchers_bought'],
    'Streaks': ['c_round_interest_cap_streak', 'c_single_hand_round_streak']
  }

  Object.keys(stats).slice(0, 20).forEach((key) => {
    stats[key].value = profile.career_stats[key]
  })

  const goldStakeWins = Object.values(profile.deck_usage).map((deck) => deck.wins?.['8'] ?? 0).reduce((sum, x) => sum + x, 0)
  const goldStakeLosses = Object.values(profile.deck_usage).map((deck) => deck.losses?.['8'] ?? 0).reduce((sum, x) => sum + x, 0)
  const goldStakeWinPercentage = Math.round(goldStakeWins / (goldStakeWins + goldStakeLosses || 1) * 10000) / 100

  stats['gold_stake_wins'].value = goldStakeWins
  stats['gold_stake_losses'].value = goldStakeLosses
  stats['gold_stake_win_percentage'].value = goldStakeWinPercentage

  stats['total_tarots_used'].value = Object.entries(profile.consumeable_usage).reduce((sum, [key, {count}]) => {
    if (tarotKeys.includes(key)) {
      return sum + count
    }
    return sum
  }, 0)

  stats['total_planets_used'].value = Object.entries(profile.consumeable_usage).reduce((sum, [key, {count}]) => {
    if (planetKeys.includes(key)) {
      return sum + count
    }
    return sum
  }, 0)

  stats['total_spectrals_used'].value = Object.entries(profile.consumeable_usage).reduce((sum, [key, {count}]) => {
    if (spectralKeys.includes(key)) {
      return sum + count
    }
    return sum
  }, 0)

  stats['total_consumables_used'].value = Object.values(profile.consumeable_usage).reduce((sum, {count}) => {
    return sum + count
  }, 0)

  const gamesPlayed = profile.career_stats['c_wins'] + profile.career_stats['c_losses'] || 1
  const winPercentage = Math.round(profile.career_stats['c_wins'] / (gamesPlayed) * 10000) / 100
  stats['win_percentage'].value = winPercentage

  return (
    <div className={styles.careerStats}>
      {Object.entries(sections).map(([section, keys]) => {
        return (
          <div key={section}>
            <div className={styles.careerStatsLabel}>
              {section}
            </div>

            {keys.map((key) => {
              const value = (() => {
                switch (stats[key].type) {
                  default:
                  case 'number':
                    return numberWithCommas(stats[key].value)
                  case 'money':
                    return `$${numberWithCommas(stats[key].value)}`
                  case 'percentage':
                    return `${stats[key].value}%`
                }
              })()
              return (
                <Stat
                  key={key}
                  name={stats[key].name}
                  value={value}
                  extra={settings.showPerGameStats.enabled && stats[key].perGame ? Math.round(stats[key].value / gamesPlayed * 10) / 10: undefined}
                  color={stats[key].color}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
