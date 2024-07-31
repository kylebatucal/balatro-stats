import { useContext, useState } from 'react'
import styles from '@/app/styles/sections/collection.module.css'
import { CardType, Profile } from "@/app/lib/types"
import Button from '@/app/components/inputs/Button'
import { filterCards, getHighestStake, sumStakes, useToImage } from '@/app/lib/utils'
import InputContainer from '../../inputs/InputContainer'
import Select from '../../inputs/Select'
import Search from '../../inputs/Search'
import { initalConsumables, initalDecks, initalJokers, initalVouchers } from '../../../lib/cards/cards'
import Grid from './Grid'
import List from './List'
import Graph from './Graph'
import Filters from '../../inputs/Filters'
import { useImmer } from 'use-immer'
import { baseVoucherNames, upgradedVoucherNames } from '../../../lib/cards/cardKeys'
import { settingsContext } from '@/app/lib/context'

interface TabType {
  name: string
  sorts: string[]
  graphs: string[]
  filters: string[]
  views: string[]
}

const tabs: Record<string, TabType> = {
  Jokers: {
    name: 'Jokers',
    sorts: ['Game Order', 'Name', 'Wins', 'Win %', 'Wins per Loss', 'Losses', 'Rounds', 'Rarity', 'Stake'],
    graphs: ['Rounds', 'Wins', 'Win %', 'Wins per Loss', 'Losses'],
    filters: ['Stake', 'Rarity'],
    views: ['Grid', 'List', 'Graph'],
  },
  Decks: {
    name: 'Decks',
    sorts: ['Game Order', 'Name', 'Wins', 'Win %', 'Wins per Loss', 'Losses', 'Stake'],
    graphs: ['Wins', 'Win %', 'Wins per Loss', 'Losses'],
    filters: ['Stake'],
    views: ['Grid', 'List', 'Graph'],
  },
  Consumables: {
    name: 'Consumables',
    sorts: ['Game Order', 'Name', 'Uses'],
    graphs: ['Uses'],
    filters: ['Type'],
    views: ['Grid', 'Graph'],
  },
  Vouchers: {
    name: 'Vouchers',
    sorts: ['Game Order', 'Name', 'Redeems'],
    graphs: ['Redeems'],
    filters: ['Tier'],
    views: ['Grid', 'Graph'],
  },
}

interface FilterType {
  name: string
  filters: Record<string, {
    filter: (card: CardType) => boolean
    enabled: boolean
  }>
} 

const cardFilters: Record<string, FilterType> = {
  Stake: {
    name: 'Stake',
    filters: {
      'None': {
        filter: (card: CardType) => card.wins ? sumStakes(card.wins) == 0 : false,
        enabled: false
      },
      'White Stake': {
        filter: (card: CardType) => card.wins ? getHighestStake(card.wins) == 1 : false,
        enabled: false
      },
      'Red Stake': {
        filter: (card: CardType) => card.wins ? getHighestStake(card.wins) == 2 : false,
        enabled: false
      },
      'Green Stake': {
        filter: (card: CardType) => card.wins ? getHighestStake(card.wins) == 3 : false,
        enabled: false
      },
      'Black Stake': {
        filter: (card: CardType) => card.wins ? getHighestStake(card.wins) == 4 : false,
        enabled: false
      },
      'Blue Stake': {
        filter: (card: CardType) => card.wins ? getHighestStake(card.wins) == 5 : false,
        enabled: false
      },
      'Purple Stake': {
        filter: (card: CardType) => card.wins ? getHighestStake(card.wins) == 6 : false,
        enabled: false
      },
      'Orange Stake': {
        filter: (card: CardType) => card.wins ? getHighestStake(card.wins) == 7 : false,
        enabled: false
      },
      'Gold Stake': {
        filter: (card: CardType) => card.wins ? getHighestStake(card.wins) == 8 : false,
        enabled: false
      },
    }
  },
  Rarity: {
    name: 'Rarity',
    filters: {
      Common: {
        filter: (card: CardType) => card.status == 'Common',
        enabled: false
      },
      Uncommon: {
        filter: (card: CardType) => card.status == 'Uncommon',
        enabled: false
      },
      Rare: {
        filter: (card: CardType) => card.status == 'Rare',
        enabled: false
      },
      Legendary: {
        filter: (card: CardType) => card.status == 'Legendary',
        enabled: false
      },
    }
  },
  Type: {
    name: 'Type',
    filters: {
      Tarot: {
        filter: (card: CardType) => card.status == 'Tarot',
        enabled: false
      },
      Planet: {
        filter: (card: CardType) => card.status == 'Planet',
        enabled: false
      },
      Spectral: {
        filter: (card: CardType) => card.status == 'Spectral',
        enabled: false
      },
    }
  },
  Tier: {
    name: 'Tier',
    filters: {
      Base: {
        filter: (card: CardType) => {return baseVoucherNames.includes(card.name)},
        enabled: false
      },
      Upgraded: {
        filter: (card: CardType) => {return upgradedVoucherNames.includes(card.name)},
        enabled: false
      },
    }
  }
}

export default function Collection(
{
  profile
}: {
  profile: Profile
}) {
  const [tab, setTab] = useState(tabs['Jokers'])
  const [search, setSearch] = useState('')
  const [view, setView] = useState(tab.views[0])
  const sorts = view == 'Graph' ? tab.graphs : tab.sorts
  const [sort, setSort] = useState(sorts[0])
  const [filters, setFilters] = useImmer(cardFilters)
  const activeFilters = tab.filters.map((group) => Object.values(filters[group].filters).filter(({enabled}) => enabled).map(({filter}) => filter))
  const settings = useContext(settingsContext)
  const [ref, savePNG] = useToImage(tab.name.toLowerCase(), settings.saveImageinNewTab.enabled)

  if (!tab.views.includes(view)) {
    setView(tab.views[1])
  }
  if (!sorts.includes(sort)) {
    setSort(sorts[0])
  }

  const jokers = initalJokers()
  Object.entries(profile.joker_usage).forEach(([joker, stats]) => {
    jokers[joker].wins = stats.wins
    jokers[joker].losses = stats.losses
    jokers[joker].count = stats.count
  })

  const decks = initalDecks()
  Object.entries(profile.deck_usage).forEach(([deck, stats]) => {
    decks[deck].wins = stats.wins;
    decks[deck].losses = stats.losses
  })

  const consumables = initalConsumables()
  Object.entries(profile.consumeable_usage).forEach(([card, stats]) => {
    consumables[card].count = stats.count
  })

  const vouchers = initalVouchers()
  Object.entries(profile.voucher_usage).forEach(([voucher, stats]) => {
    vouchers[voucher].count = stats.count
  })

  const cards = (() => {
    switch(tab.name) {
      default:
      case 'Jokers':
        return Object.values(jokers)
      case 'Decks':
        return Object.values(decks)
      case 'Consumables':
        return Object.values(consumables)
      case 'Vouchers':
        return Object.values(vouchers)
    }
  })()

  const filteredCards = filterCards(cards, search, sort, activeFilters)

  const insides = (() => {
    switch(view) {
      case 'Grid':
        return <Grid cards={filteredCards} tab={tab.name}/>
      case 'List':
        return <List cards={filteredCards}/>
      case 'Graph':
        return <Graph cards={filteredCards} tab={tab.name} sort={sort}/>
    }
  })()

  return (
    <div>
      <div className={styles.collection} ref={ref}>
        <div className={styles.tabs}>
          {Object.keys(tabs).map((tabName) => {
            return (
              <Button 
                key={tabName} 
                name={tabName} 
                active={tab.name == tabName} 
                color={'red'}
                callback={() => setTab(tabs[tabName])}
              />
            )
          })}
        </div>

        <>
          <InputContainer label={'Search'}>
            <Search options={cards.map((card) => card.name)} current={search} setCurrent={setSearch} placeholder={tab.name}/>
          </InputContainer>

          <InputContainer label={'Sort'}>
            <Select options={sorts} current={sort} setCurrent={setSort} color={'orange'}/>
          </InputContainer>

          <InputContainer label={'Filter'}>
            <Filters filters={tab.filters.map((group) => filters[group])} setFilters={setFilters}/>
          </InputContainer>

          <InputContainer label={'View'}>
            <Select options={tab.views} current={view} setCurrent={setView} color={'green'}/>
          </InputContainer>
        </>
      
        {insides}
      </div>

      <div 
        style={{
          paddingBottom: '0.5rem'
        }}>
        <Button
          name={'Save as Image'}
          color={'blue'}
          style={{
            borderRadius: '0 0 0.5rem 0.5rem'
          }}
          callback={savePNG}
        />
      </div>
    </div>
  )
}
