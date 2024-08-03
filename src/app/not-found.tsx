'use client'

import { soundContext } from '@/lib/context'
import { jokerExtraSprites, jokerSprites } from '@/lib/cards/cardMappings'
import Card from '@/components/pieces/Card'
import Link from 'next/link'

export default function NotFound() {
  const joker = {
    name: '404',
    image: `url(/images/cards/Jokers.png) ${jokerSprites.undiscovered} / 1000%`,
    topImage: `url(/images/cards/Enhancers.png) ${jokerExtraSprites.undiscovered} / 700% 500%`,
  }

  const sounds = {
    cardSound: () => {},
  }

  return (
    <soundContext.Provider value={sounds}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: '0.5rem',
        }}
      >
        <Card
          name={joker.name}
          image={joker.image}
          topImage={joker.topImage}
          desc={'Not Found'}
        />
        <Link href="/">Go home</Link>
      </div>
    </soundContext.Provider>
  )
}
