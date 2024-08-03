import styles from './pieces.module.css'
import { useContext, useRef, useState } from 'react'
import { settingsContext, soundContext } from '@/lib/context'
import Tooltip from './Tooltip'
import { getHighestStake, sumStakes } from '@/lib/utils'
import classNames from 'classnames/bind'

function getStickerImage(sticker: number) {
  const stickerOffsets: Record<number, string> = {
    1: '-100% 0',
    2: '-200% 0',
    3: '-300% 0',
    4: '0 -100%',
    5: '-400% 0',
    6: '-100% -100%',
    7: '-200% -100%',
    8: '-300% -100%',
  }
  return `url(/images/cards/stickers.png) ${stickerOffsets[sticker]} / 500%`
}

export default function Card({
  name,
  wins,
  losses,
  count,
  status,
  image,
  topImage,
  style,
  desc,
}: {
  name: string
  wins?: Record<number, number>
  losses?: Record<number, number>
  count?: number
  status?: string
  image: string
  topImage?: string
  style?: { translateY?: number; degrees?: number }
  desc?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const settings = useContext(settingsContext)
  const [[x, y], setDegrees] = useState([0, 0])

  let opacity = 1
  if (settings.fadeCardsWithNoRounds.enabled) {
    opacity = count === undefined || count != 0 ? opacity : 0.5
  }
  if (settings.fadeCardsWithNoWins.enabled) {
    opacity = wins === undefined || (wins && sumStakes(wins)) ? opacity : 0.5
  }

  let stickerImage
  if (wins && Object.keys(wins).length != 0) {
    const sticker = getHighestStake(wins)
    stickerImage = getStickerImage(sticker)
  }

  const cx = classNames.bind(styles)
  const classes = cx({
    topImage: topImage,
    legendary: !['Hologram', 'The Soul', '404'].includes(name),
    hologram: name == 'Hologram',
    soul: name == 'The Soul',
    undiscovered: name == '404',
  })

  let transform = []
  if (settings.cardPerspective.enabled) {
    transform.push(`rotateY(${x}deg) rotateX(${-y}deg)`)
  }
  if (name == 'Wee Joker') {
    transform.push('scale(0.75)')
  }
  if (style?.degrees) {
    transform.push(`rotate(${style.degrees}deg)`)
  }
  const transformStyle = transform.join(' ')

  const sounds = useContext(soundContext)
  const play = sounds['cardSound']

  return (
    <Tooltip
      name={name}
      wins={wins && Object.values(wins).reduce((sum, x) => sum + x, 0)}
      losses={losses && Object.values(losses).reduce((sum, x) => sum + x, 0)}
      rounds={count}
      status={status}
      translateY={style?.translateY}
      desc={desc}
    >
      <div
        className={styles.card}
        ref={cardRef}
        style={{
          background: stickerImage ? `${stickerImage}, ${image}` : image,
          transform: transformStyle,
          opacity: opacity,
        }}
        onPointerEnter={() => {
          play({ playbackRate: Math.random() * 0.2 + 0.9 })
        }}
        onPointerMove={(e) => {
          if (settings.cardPerspective.enabled && cardRef.current) {
            const { top, right, bottom, left, x, y } =
              cardRef.current.getBoundingClientRect()
            const width = right - left
            const height = bottom - top

            const { clientX, clientY } = e

            const xPercentage = (clientX - x) / width
            const yPercentage = (clientY - y) / height

            const degrees = 15
            setDegrees([
              degrees * xPercentage - degrees / 2,
              degrees * yPercentage - degrees / 2,
            ])
          }
        }}
        onPointerLeave={() => {
          setDegrees([0, 0])
        }}
      >
        {topImage && (
          <div
            className={classes}
            style={{
              background: topImage,
            }}
          />
        )}
      </div>
    </Tooltip>
  )
}
