import styles from './stat.module.css'
import Stat from './Stat'

export default function Progress({
  progress,
  allUnlocked,
}: {
  progress: any
  allUnlocked: boolean
}) {
  const progressValue = Math.floor(
    (progress.overall_tally / progress.overall_of) * 100,
  )
  const keys = ['discovered', 'challenges', 'joker_stickers', 'deck_stakes']
  const keysToEnglish: Record<string, string> = {
    discovered: 'Collection',
    challenges: 'Challenges',
    joker_stickers: 'Joker Stickers',
    deck_stakes: 'Deck Stake Wins',
  }
  return (
    <div className={styles.progress}>
      <Stat
        name="Progress"
        value={`${progressValue}%`}
        bar={{
          percentage: progressValue,
          allUnlocked: allUnlocked,
        }}
      />
      {keys.map((key) => {
        const percentage = Math.floor(
          (progress[key].tally / progress[key].of) * 100,
        )
        return (
          <Stat
            key={key}
            name={keysToEnglish[key]}
            value={`${percentage}%`}
            extra={`${progress[key].tally}/${progress[key].of}`}
            bar={{
              percentage: percentage,
              allUnlocked: allUnlocked,
            }}
          />
        )
      })}
    </div>
  )
}
