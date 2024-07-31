import { CardType } from '@/app/lib/types'
import styles from '@/app/styles/pieces.module.css'
import Card from './Card'

export default function Hand(
{
  cards,
  gap
}: {
  cards: CardType[]
  gap: string
}) {
  const maximumDegrees = 5

  return (
    <div 
      className={styles.hand}
      style={{
        gridTemplateColumns: `repeat(${cards.length}, minmax(0, calc(var(--card-width) + ${gap})))`,
      }}
    >
      {
        cards.map((card, i) => {
          const translateY = -(1/2) * Math.sin((Math.PI / (cards.length - 1)) * i) - 0.5
          const degrees = cards.length > 1 ? (maximumDegrees * 2 * i) / (cards.length - 1) - maximumDegrees : 0

          return (
            <Card
              key={card.name}
              name={card.name}
              wins={card.wins}
              losses={card.losses}
              count={card.count}
              status={card.status}
              image={card.image}
              topImage={card.topImage}
              style={{
                translateY: translateY,
                degrees: degrees
              }}
            />
          )
        })
      }
    </div>
  )  
}
