import styles from '@/app/styles/sections/collection.module.css'
import Hand from "../../pieces/Hand"
import { CardType } from '@/app/lib/types'

export default function Grid(
{
  cards,
  tab
}: {
  cards: CardType[]
  tab: string
}) {
  const cardsPerHand = tab != 'Vouchers' ? 5 : 4
  const gap = '0.25rem'
  const hands = []
  for (let i = 0; i < cards.length; i += cardsPerHand) {
    hands.push(
      <Hand
        key={i} 
        cards={cards.slice(i, i + cardsPerHand)}
        gap={gap}
      />
    )
  }

  return (
    <div className={styles.grid}>
      {hands}
    </div>
  )  
}
