import {
  consumableNames,
  consumableSprites,
  deckNames,
  deckSprites,
  jokerExtraSprites,
  jokerNames,
  jokerRarity,
  jokerSprites,
  voucherNames,
  voucherSprites,
} from './cardMappings'
import {
  consumableKeys,
  deckKeys,
  jokerKeys,
  planetKeys,
  spectralKeys,
  tarotKeys,
  voucherKeys,
} from './cardKeys'
import { CardType } from '@/lib/types'

export function initializeJoker(key: string): CardType {
  return {
    name: jokerNames[key] || key,
    wins: {},
    losses: {},
    count: 0,
    image: jokerSprites[key]
      ? `url(/images/cards/Jokers.png) ${jokerSprites[key]} / 1000% 1600%`
      : `url(/images/cards/Jokers.png) ${jokerSprites.undiscovered} / 1000%`,
    topImage: jokerSprites[key]
      ? jokerExtraSprites[key] &&
        `url(/images/cards/Jokers.png) ${jokerExtraSprites[key]} / 1000% 1600%`
      : `url(/images/cards/Enhancers.png) ${jokerExtraSprites.undiscovered} / 700% 500%`,
    status: jokerRarity[key] ? jokerRarity[key] : 'Unknown',
  }
}

export function initializeDeck(key: string): CardType {
  return {
    name: deckNames[key] || key,
    wins: {},
    losses: {},
    image: deckNames[key]
      ? `url(/images/cards/Enhancers.png) ${deckSprites[key]} / 700%`
      : `url(/images/cards/Enhancers.png) ${deckSprites.locked} / 700%`,
    status: 'Deck',
  }
}

export function initializeConsumable(key: string): CardType {
  const status = (() => {
    if (tarotKeys.includes(key)) {
      return 'Tarot'
    } else if (planetKeys.includes(key)) {
      return 'Planet'
    } else if (spectralKeys.includes(key)) {
      return 'Spectral'
    } else {
      return 'Consumable'
    }
  })()

  return {
    name: consumableNames[key] || key,
    count: 0,
    image: consumableSprites[key]
      ? `url(/images/cards/Tarots.png) ${consumableSprites[key]} / 1000%`
      : `url(/images/cards/Tarots.png) ${consumableSprites.undiscovered} / 1000%`,
    topImage: consumableSprites[key]
      ? key == 'c_soul'
        ? `url(/images/cards/Enhancers.png) 0 -100% / 700%`
        : ''
      : `url(/images/cards/Enhancers.png) ${consumableSprites.undiscovered_extra} / 700%`,
    status: status,
  }
}

export function initializeVouchers(key: string): CardType {
  return {
    name: voucherNames[key] || key,
    count: 0,
    image: voucherNames[key]
      ? `url(/images/cards/Vouchers.png) ${voucherSprites[key]} / 900%`
      : `url(/images/cards/Vouchers.png) ${voucherSprites.undiscovered} / 900%`,
    topImage: !voucherNames[key]
      ? `url(/images/cards/Enhancers.png) ${voucherSprites.undiscovered_extra} / 700%`
      : '',
    status: 'Voucher',
  }
}

export const initialJokers = () => {
  const jokers: Record<string, CardType> = {}
  jokerKeys.map((key) => {
    jokers[key] = initializeJoker(key)
  })
  return jokers
}

export const initialDecks = () => {
  const decks: Record<string, CardType> = {}
  deckKeys.map((key) => {
    decks[key] = initializeDeck(key)
  })
  return decks
}

export const initialConsumables = () => {
  const consumables: Record<string, CardType> = {}
  consumableKeys.map((key) => {
    consumables[key] = initializeConsumable(key)
  })
  return consumables
}

export const initialVouchers = () => {
  const vouchers: Record<string, CardType> = {}
  voucherKeys.map((key) => {
    vouchers[key] = initializeVouchers(key)
  })
  return vouchers
}
