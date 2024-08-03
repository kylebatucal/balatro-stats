import styles from './collection.module.css'
import { CardType } from '@/lib/types'
import Card from '../../pieces/Card'
import Chips from '../../pieces/Chips'

function ListRow({ card }: { card: CardType }) {
  return (
    <div className={styles.listRow}>
      <Card
        name={card.name}
        wins={card.wins}
        losses={card.losses}
        count={card.count}
        status={card.status}
        image={card.image}
        topImage={card.topImage}
      />
      {card.wins && card.losses && (
        <Chips wins={card.wins} losses={card.losses} />
      )}
    </div>
  )
}

export default function List({ cards }: { cards: CardType[] }) {
  return (
    <div className={styles.list}>
      {cards.map((card) => {
        return <ListRow key={card.name} card={card} />
      })}
    </div>
  )
}
