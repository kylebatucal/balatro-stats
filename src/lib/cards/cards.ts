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

function initializeJoker(key: string): CardType {
  return {
    name: jokerNames[key],
    wins: {},
    losses: {},
    count: 0,
    image: `url(/images/cards/Jokers.png) ${jokerSprites[key]} / 1000% 1600%`,
    topImage:
      jokerExtraSprites[key] &&
      `url(/images/cards/Jokers.png) ${jokerExtraSprites[key]} / 1000% 1600%`,
    status: jokerRarity[key],
  }
}

function initializeDeck(key: string): CardType {
  return {
    name: deckNames[key],
    wins: {},
    losses: {},
    image: `url(/images/cards/Enhancers.png) ${deckSprites[key]} / 700%`,
    status: 'Deck',
  }
}

function initializeConsumable(key: string): CardType {
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
    name: consumableNames[key],
    count: 0,
    image: `url(/images/cards/Tarots.png) ${consumableSprites[key]} / 1000%`,
    topImage:
      key == 'c_soul' ? `url(/images/cards/Enhancers.png) 0 -100% / 700%` : '',
    status: status,
  }
}

function initializeVouchers(key: string): CardType {
  return {
    name: voucherNames[key],
    count: 0,
    image: `url(/images/cards/Vouchers.png) ${voucherSprites[key]} / 900%`,
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
