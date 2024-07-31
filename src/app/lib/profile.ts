import Pako from 'pako'
import { Profile } from './types'

export function decompressJKR(data: ArrayBuffer) {
  // Can read profile.jkr, save.jkr, and meta.jkr
  // However, it cannot read version.jkr (it's just plaintext)
  const uncompressed = Pako.inflateRaw(data, { to: 'string' })
  const formatted = uncompressed
    .replace(/^return /, '')
    .replace(/\["(.*?)"\]=/g, '\"$1\":')
    .replace(/\[(\d+)\]=/g, '\"$1\":')
    .replace(/,}/g, '}')
  return JSON.parse(formatted)
}

export function readProfile(file: File, callback: (data: Profile) => void) {
  const reader = new FileReader()
  reader.onload = ((e) => {
    try {
      const data = decompressJKR(e.target!.result as ArrayBuffer)
      if (data?.joker_usage) { // check if its profile.jkr
        callback(data)
      } else {
        alert('ERROR: File is not profile.jkr')
      }
    } catch (err) {
      console.error(err)
      alert('ERROR: Could not read file')
    }
  })
  reader.readAsArrayBuffer(file)
}

export const initialProfile: Profile = {
  career_stats: {
    c_cards_discarded: 0,
    c_cards_played: 0,
    c_cards_sold: 0,
    c_dollars_earned: 0,
    c_face_cards_played: 0,
    c_hands_played: 0,
    c_jokers_sold: 0,
    c_losses: 0,
    c_planetarium_used: 0,
    c_planets_bought: 0,
    c_playing_cards_bought: 0,
    c_round_interest_cap_streak: 0, // consecutive rounds at max interest
    c_rounds: 0,
    c_shop_dollars_spent: 0,
    c_shop_rerolls: 0,
    c_single_hand_round_streak: 0, // consecutive single hand round wins
    c_tarot_reading_used: 0,
    c_tarots_bought: 0,
    c_vouchers_bought: 0,
    c_wins: 0,
  },
  consumeable_usage: {},
  deck_stakes: {},
  deck_usage: {},
  hand_usage: {},
  high_scores: {
    boss_streak: {label: 'Most Bosses in a Row', amt: 0},
    collection: {amt: 2, label: 'Collection', tot: 340},
    current_streak: {label: '', amt: 0},
    furthest_ante: {label: 'Highest Ante', amt: 0},
    furthest_round: {label: 'Highest Round', amt: 0},
    hand: {label: 'Best Hand', amt: 0},
    most_money: {label: 'Most Money', amt: 0},
    poker_hand: {label: 'Most Played Hand', amt: 0},
    win_streak: {label: 'Best Win Streak', amt: 0}
  },
  joker_usage: {},
  name: 'Jimbo',
  progress: {
    challenges: {of: 20, tally: 0},
    deck_stakes: {of: 120, tally: 0},
    discovered: {of: 340, tally: 2}, // it is impossible for the tally to be 0; the player starts with Joker and Red Deck
    joker_stickers: {of: 1200, tally: 0},
    overall_of: 4,
    overall_tally: 2/(20+120+340+1200)
  },
  voucher_usage: {},
  lastUpdated: null
}
