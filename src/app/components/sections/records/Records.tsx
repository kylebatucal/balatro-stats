'use client'

import styles from '@/app/styles/sections/records.module.css'
import { Profile } from '@/app/lib/types'
import { useContext, useState } from 'react'
import Button from '@/app/components/inputs/Button'
import HighScores from '@/app/components/sections/records/HighScores/HighScores'
import CareerStats from '@/app/components/sections/records/CareerStats/CareerStats'
import HandStats from '@/app/components/sections/records/HandStats/HandStats'
import { useToImage } from '@/app/lib/utils'
import { settingsContext } from '@/app/lib/context'

export default function Records({ profile }: { profile: Profile }) {
  const settings = useContext(settingsContext)
  const tabs = ['High Scores', 'Career Stats', 'Hand Stats']
  const [tab, setTab] = useState(tabs[0])
  const [ref, savePNG] = useToImage(
    tab.toLowerCase().replace(' ', '_'),
    settings.saveImageinNewTab.enabled,
  )

  const insides = (() => {
    switch (tab) {
      case 'High Scores':
        return <HighScores profile={profile} />
      case 'Career Stats':
        return <CareerStats profile={profile} />
      case 'Hand Stats':
        return <HandStats profile={profile} />
    }
  })()

  return (
    <div>
      <div className={styles.records} ref={ref}>
        <div className={styles.tabs}>
          {tabs.map((tabName, i) => {
            return (
              <Button
                key={tabName}
                name={tabName}
                active={tab == tabName}
                color={'red'}
                callback={() => {
                  setTab(tabs[i])
                }}
              />
            )
          })}
        </div>
        {insides}
      </div>

      <div
        style={{
          paddingBottom: '0.5rem',
        }}
      >
        <Button
          name={'Save as Image'}
          color={'blue'}
          style={{
            borderRadius: '0 0 0.5rem 0.5rem',
          }}
          callback={savePNG}
        />
      </div>
    </div>
  )
}
