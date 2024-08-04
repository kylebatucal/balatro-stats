export interface Profile {
  all_unlocked?: boolean
  career_stats: Record<string, number>
  consumeable_usage: Record<string, { order: number; count: number }>
  deck_usage: Record<
    string,
    {
      order: number
      count: number
      wins: Record<number, number>
      losses: Record<number, number>
    }
  >
  hand_usage: Record<string, { order: string; count: number }>
  high_scores: Record<string, { tot?: number; label: string; amt: number }>
  joker_usage: Record<
    string,
    {
      order: number
      count: number
      wins: Record<number, number>
      losses: Record<number, number>
    }
  >
  name: string
  progress: {
    challenges: { of: number; tally: number }
    deck_stakes: { of: number; tally: number }
    discovered: { of: number; tally: number }
    joker_stickers: { of: number; tally: number }
    overall_of: number
    overall_tally: number
  }
  voucher_usage: Record<string, { order: number; count: number }>
  lastUpdated: string | null

  // Unused stuff / stuff I don't care about
  MEMORY?: { deck: string; stake: number }
  challenge_progress?: {
    completed: Record<string, boolean>
    unlocked: Record<string, boolean>
  }
  challenges_unlocked?: number
  deck_stakes?: {}
  stake?: number
}

export interface CardType {
  name: string
  wins?: Record<number, number>
  losses?: Record<number, number>
  count?: number
  image: string
  topImage?: string
  status: string
}

export interface FilterType {
  name: string
  filters: Record<
    string,
    {
      filter: (card: CardType) => boolean
      enabled: boolean
    }
  >
}
