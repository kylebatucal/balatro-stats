import styles from '@/app/styles/sections/collection.module.css'
import { CardType } from '@/app/lib/types'
import Card from '../../pieces/Card'
import { sumStakes } from '@/app/lib/utils'

function getStat(card: CardType, sort: string) {
  switch (sort) {
    default:
    case 'Rounds':
    case 'Uses':
    case 'Redeems':
      return card.count ?? 0
    case 'Wins':
      return card.wins ? sumStakes(card.wins) : 0
    case 'Win %':
      var wins = card.wins ? sumStakes(card.wins) : 0
      var losses = card.losses ? sumStakes(card.losses) : 0
      var rounds = wins + losses
      var winPercentage = wins / (rounds || 1)
      return Math.round(winPercentage * 100)
    case 'Wins per Loss':
      var wins = card.wins ? sumStakes(card.wins) : 0
      var losses = card.losses ? sumStakes(card.losses) : 0
      return Math.round((wins / (losses || 1)) * 100) / 100
    case 'Losses':
      return card.losses ? sumStakes(card.losses) : 0
  }
}

function getTotal(cards: CardType[], sort: string) {
  let total;
  const card = cards[0]
  switch (sort) {
    default:
    case 'Rounds':
    case 'Uses':
    case 'Redeems':
      total = card.count
      break
    case 'Wins':
      total = card.wins ? sumStakes(card.wins) : 0
      break
    case 'Win %':
      return 100
    case 'Wins per Loss':
      var wins = card.wins ? sumStakes(card.wins) : 0
      var losses = card.losses ? sumStakes(card.losses) : 0
      total = (wins / (losses || 1))
      break
    case 'Losses':
      total = card.losses ? sumStakes(card.losses) : 0
      break
  }
  return total || 1
}

function GraphRow({
  card,
  stat,
  total,
  asPercentage
}: {
  card: CardType
  stat: number
  total: number
  asPercentage: boolean
}) {
  const isJoker = card.status == 'Common' || card.status == 'Uncommon' || card.status == 'Rare' || card.status == 'Legendary'
  return (
    <div className={styles.graphRow}>
      <div 
        className={styles.graphBar}
        style={{
          backgroundColor: stat != 0 ? isJoker ? '#5f7e85' : `var(--${card.status})` : '#475658',
          width: `calc((100% - var(--card-width) - 3rem - 0.5rem - 0.25rem) * ${stat / total} + 0.5rem)`,
        }}
      />


      <div className={styles.graphNumber}>
        {asPercentage ? `${stat}%` : stat || '-'}
      </div>

      <Card
        name={card.name}
        wins={card.wins}
        losses={card.losses}
        count={card.count}
        status={card.status}
        image={card.image}
        topImage={card.topImage}
      />
    </div>
  )
}

export default function Graph(
{
  cards,
  tab,
  sort,
}: {
  cards: CardType[]
  tab: string
  sort: string
}) {
  const legendText: Record<string, string> = {
    'Rounds': 'Total completed rounds with this card',
    'Uses': 'Number of times this card has been used',
    'Redeems': 'Number of times this Voucher has been redeemed',

    'Round %': 'Percentage of completed rounds with this card',
    'Use %': 'Percentage of times this card has been used',
    'Redeem %': 'Percentage of times this Voucher has been redeemed',

    'Wins': `Number of wins with this ${tab == 'Decks' ? 'deck' : 'card'}`,
    'Win %': `Percentage of games won with this ${tab == 'Decks' ? 'deck' : 'card'}`,
    'Wins per Loss': `Number of wins per loss with this ${tab == 'Decks' ? 'deck' : 'card'}`,
    'Losses': `Number of losses with this ${tab == 'Decks' ? 'deck' : 'card'}`,
  }

  return (
    <div className={styles.list}>
      <div className={styles.graphLegend}>
        <div className={styles.graphSquare}/>
        <>{legendText[sort]}</>
      </div>
      {cards.map((card, i) => {
        const stat = getStat(card, sort)
        const total = getTotal(cards, sort)
        return (
          <GraphRow 
            key={i} // this is necessary for the bar animations to work
            card={card}
            stat={stat}
            total={total}
            asPercentage={sort == 'Win %' || sort == 'Round %'}
          />
        )
      })}
    </div>
  )  
}
