import { toBlob } from 'html-to-image'
import { MutableRefObject, useCallback, useRef } from 'react'
import { CardType } from './types'
import FileSaver from 'file-saver'

export function numberWithCommas(number: number) {
  // https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function useToImage(
  filename: string,
  newTab?: boolean,
): [MutableRefObject<null>, () => void] {
  const ref = useRef(null)
  const saveImage = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toBlob(ref.current)
      .then((blob) => {
        if (blob) {
          if (newTab) {
            const url = URL.createObjectURL(blob)
            window.open(url)
            URL.revokeObjectURL(url)
          } else {
            FileSaver.saveAs(blob, filename)
          }
        }
      })
      .catch((err) => {
        alert(
          `ERROR: too many cards to save as image. Filter out cards or use Chrome to fix this.`,
        )
        console.error(err)
      })
  }, [filename, newTab, ref])
  return [ref, saveImage]
}

export function sumStakes(stakes: Record<number, number>) {
  return Object.values(stakes).reduce((sum, x) => sum + x, 0)
}

export function getHighestStake(stakes: Record<number, number>) {
  return Object.keys(stakes).length != 0
    ? Math.max(...Object.keys(stakes).map((key) => parseInt(key, 10)))
    : 0
}

export function filterCards(
  cards: CardType[],
  search: string,
  sort: string,
  filters: ((card: CardType) => boolean)[][],
) {
  let filteredCards = cards

  if (filters.length) {
    filters.forEach((group) => {
      if (group.length) {
        const combinedFilters = (card: CardType) =>
          group.some((filter) => filter(card))
        filteredCards = filteredCards.filter(combinedFilters)
      }
    })
  }

  // Check for exact match first
  const match = filteredCards.filter(
    (card) => card.name.toLowerCase() == search.toLowerCase(),
  )
  if (match.length) {
    return match
  } else {
    filteredCards = filteredCards.filter((card) =>
      card.name.toLowerCase().includes(search.toLowerCase()),
    )
  }

  filteredCards = sortCards(filteredCards, sort)
  return filteredCards
}

function sortCards(cards: CardType[], sort: string) {
  switch (sort) {
    default:
    case 'Game Order':
      return cards

    case 'Name':
      return cards.toSorted((a, b) => {
        if (a.name < b.name) {
          return -1
        } else if (a.name > b.name) {
          return 1
        }
        return 0
      })

    case 'Wins':
      return cards.toSorted((a, b) => {
        const aWins = a.wins ? sumStakes(a.wins) : 0
        const bWins = b.wins ? sumStakes(b.wins) : 0
        return bWins - aWins
      })

    case 'Win %':
      return cards.toSorted((a, b) => {
        const aWins = a.wins ? sumStakes(a.wins) : 0
        const aLosses = a.losses ? sumStakes(a.losses) : 0
        const aRounds = aWins + aLosses
        const aWinPercentage = aWins / (aRounds || 1)

        const bWins = b.wins ? sumStakes(b.wins) : 0
        const bLosses = b.losses ? sumStakes(b.losses) : 0
        const bRounds = bWins + bLosses
        const bWinPercentage = bWins / (bRounds || 1)

        if (aWinPercentage == bWinPercentage) {
          // favor cards with more wins
          if (aWins > bWins) {
            return -1
          } else if (aWins < bWins) {
            return 1
            // if 0 = aWins = bWins
          } else if (aLosses > bLosses) {
            return -1
          } else if (aLosses < bLosses) {
            return 1
          }
        }
        return bWinPercentage - aWinPercentage
      })

    case 'Wins per Loss':
      return cards.toSorted((a, b) => {
        const aWins = a.wins ? sumStakes(a.wins) : 0
        const aLosses = a.losses ? sumStakes(a.losses) : 0
        const aRatio = aWins / (aLosses || 1)

        const bWins = b.wins ? sumStakes(b.wins) : 0
        const bLosses = b.losses ? sumStakes(b.losses) : 0
        const bRatio = bWins / (bLosses || 1)

        if (bRatio < aRatio) {
          return -1
        } else if (bRatio > aRatio) {
          return 1
        }

        // same win ratio
        if (bWins < aWins) {
          return -1
        } else if (bWins > aWins) {
          return 1
        }

        // same wins
        if (bLosses < aLosses) {
          return 1
        } else if (bLosses > aLosses) {
          return -1
        }
        return 0
      })

    case 'Losses':
      return cards.toSorted((a, b) => {
        const aLosses = a.losses ? sumStakes(a.losses) : 0
        const bLosses = b.losses ? sumStakes(b.losses) : 0
        return bLosses - aLosses
      })

    case 'Rounds':
    case 'Uses':
    case 'Redeems':
      return cards.toSorted((a, b) => (b.count ?? 0) - (a.count ?? 0))

    case 'Rarity':
      return cards.toSorted((a, b) => {
        const rarityMapping: Record<string, number> = {
          Common: 0,
          Uncommon: 1,
          Rare: 2,
          Legendary: 3,
        }
        const difference = rarityMapping[b.status] - rarityMapping[a.status]

        if (difference == 0) {
          return -1
        } else {
          return difference
        }
      })

    case 'Stake':
      return cards.toSorted((a, b) => {
        const aStakes = a.wins
          ? Object.keys(a.wins).map((key) => parseInt(key, 10))
          : [0]
        const aHighestStake = Math.max(...aStakes)

        const bStakes = b.wins
          ? Object.keys(b.wins).map((key) => parseInt(key, 10))
          : [0]
        const bHighestStake = Math.max(...bStakes)

        return bHighestStake - aHighestStake
      })
  }
}
