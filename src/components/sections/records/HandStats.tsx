import styles from './records.module.css'
import { Profile } from '@/lib/types'
import { useState } from 'react'
import InputContainer from '@/components/inputs/InputContainer'
import HandStat from '@/components/stats/HandStat'
import Select from '@/components/inputs/Select'

export default function HandStats({ profile }: { profile: Profile }) {
  interface HandType {
    name: string
    level: number
    usage: number
    chips: number
    mult: number
    pchips: number
    pmult: number
  }

  const hands: Record<string, HandType> = {
    HighCard: {
      name: 'High Card',
      level: 1,
      usage: 0,

      chips: 5,
      mult: 1,
      pchips: 10,
      pmult: 1,
    },
    Pair: {
      name: 'Pair',
      level: 1,
      usage: 0,

      chips: 10,
      mult: 2,
      pchips: 15,
      pmult: 1,
    },
    TwoPair: {
      name: 'Two Pair',
      level: 1,
      usage: 0,

      chips: 20,
      mult: 2,
      pchips: 20,
      pmult: 1,
    },
    ThreeofaKind: {
      name: 'Three of a Kind',
      level: 1,
      usage: 0,

      chips: 30,
      mult: 3,
      pchips: 20,
      pmult: 2,
    },
    Straight: {
      name: 'Straight',
      level: 1,
      usage: 0,

      chips: 30,
      mult: 4,
      pchips: 30,
      pmult: 3,
    },
    Flush: {
      name: 'Flush',
      level: 1,
      usage: 0,

      chips: 35,
      mult: 4,
      pchips: 15,
      pmult: 2,
    },
    FullHouse: {
      name: 'Full House',
      level: 1,
      usage: 0,

      chips: 40,
      mult: 4,
      pchips: 25,
      pmult: 2,
    },
    FourofaKind: {
      name: 'Four of a Kind',
      level: 1,
      usage: 0,

      chips: 60,
      mult: 7,
      pchips: 30,
      pmult: 3,
    },
    StraightFlush: {
      name: 'Straight Flush',
      level: 1,
      usage: 0,

      chips: 100,
      mult: 8,
      pchips: 40,
      pmult: 4,
    },
    FiveofaKind: {
      name: 'Five of a Kind',
      level: 1,
      usage: 0,

      chips: 120,
      mult: 12,
      pchips: 35,
      pmult: 3,
    },
    FlushHouse: {
      name: 'Flush House',
      level: 1,
      usage: 0,

      chips: 140,
      mult: 14,
      pchips: 40,
      pmult: 4,
    },
    FlushFive: {
      name: 'Flush Five',
      level: 1,
      usage: 0,

      chips: 160,
      mult: 16,
      pchips: 50,
      pmult: 3,
    },
  }

  const planetsToHands = {
    c_pluto: 'HighCard',
    c_mercury: 'Pair',
    c_uranus: 'TwoPair',
    c_venus: 'ThreeofaKind',
    c_saturn: 'Straight',
    c_jupiter: 'Flush',
    c_earth: 'FullHouse',
    c_mars: 'FourofaKind',
    c_neptune: 'StraightFlush',
    c_planet_x: 'FiveofaKind',
    c_ceres: 'FlushHouse',
    c_eris: 'FlushFive',
  } as const

  // Update use count
  Object.entries(profile.hand_usage).forEach(([key, { count }]) => {
    hands[key].usage = count
  })

  // Update levels
  if (profile.consumeable_usage?.c_black_hole) {
    Object.keys(hands).forEach((hand) => {
      hands[hand].level += profile.consumeable_usage.c_black_hole.count
    })
  }

  for (const [planet, hand] of Object.entries(planetsToHands)) {
    if (profile.consumeable_usage?.[planet]) {
      hands[hand].level += profile.consumeable_usage[planet].count
    }
  }

  const calculateTotal = (base: number, plus: number, level: number) => {
    return base + plus * (level - 1)
  }

  const sortingOptions: Record<string, (a: HandType, b: HandType) => number> = {
    Rank: () => 0,
    Level: (a: HandType, b: HandType) => a.level - b.level,
    Chips: (a: HandType, b: HandType) =>
      calculateTotal(a.chips, a.pchips, a.level) -
      calculateTotal(b.chips, b.pchips, b.level),
    Mult: (a: HandType, b: HandType) =>
      calculateTotal(a.mult, a.pmult, a.level) -
      calculateTotal(b.mult, b.pmult, b.level),
    Score: (a: HandType, b: HandType) =>
      calculateTotal(a.chips, a.pchips, a.level) +
      calculateTotal(a.mult, a.pmult, a.level) -
      calculateTotal(b.chips, b.pchips, b.level) -
      calculateTotal(b.mult, b.pmult, b.level),
    Usage: (a: HandType, b: HandType) => a.usage - b.usage,
  }

  const [sort, setSort] = useState(Object.keys(sortingOptions)[0])
  const sortedHands = Object.values(hands).toSorted(sortingOptions[sort])

  return (
    <div className={styles.handStats}>
      <InputContainer label="Sort">
        <Select
          options={Object.keys(sortingOptions)}
          current={sort}
          setCurrent={setSort}
          color={'orange'}
        />
      </InputContainer>

      {sortedHands.toReversed().map((hand) => {
        return (
          <HandStat
            key={hand.name}
            hand={hand.name}
            level={hand.level}
            chips={calculateTotal(hand.chips, hand.pchips, hand.level)}
            mult={calculateTotal(hand.mult, hand.pmult, hand.level)}
            usage={hand.usage}
          />
        )
      })}
    </div>
  )
}
