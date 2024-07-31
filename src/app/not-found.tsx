'use client'

import styles from '@/app/styles/notfound.module.css'
import { soundContext } from '@/app/lib/context'
import { jokerExtraSprites, jokerSprites } from './lib/cards/cardMappings'
import Card from './components/pieces/Card'
import Link from 'next/link'

export default function NotFound() {
  const joker = {
    name: '404',
    image: `url(/images/cards/Jokers.png) ${jokerSprites.undiscovered} / 1000%`,
    topImage: `url(/images/cards/Enhancers.png) ${jokerExtraSprites.undiscovered} / 700%`,
  }

  const sounds = {
    cardSound: () => {},
  }

  return (
    <soundContext.Provider value={sounds}>
      <div className={styles.notFound}>
        <Card
          name={joker.name}
          image={joker.image}
          topImage={joker.topImage}
          desc={'Not Found'}
        />
        <Link href="/">
          <span className={styles.link}>Go home</span>
        </Link>
      </div>
    </soundContext.Provider>
  )
}
