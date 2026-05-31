import styles from './navbar.module.css'
import { Profile } from '@/lib/types'
import { Options } from '../popups/Options'
import { useState } from 'react'
import { Updater } from 'use-immer'
import Button from '../../inputs/Button'

export default function NavBar({
  profile,
  setter,
}: {
  profile: Profile
  setter: Updater<Record<string, { label: string; enabled: boolean }>>
}) {
  const [optionsOpen, setOptionsOpen] = useState(false)

  return (
    <>
      <div className={styles.navbar}>
        <>
          {`${profile.name}'s stats`}
          {profile.lastUpdated && ` [${profile.lastUpdated}]`}
        </>

        <div className={styles.buttons}>
          <Button
            name={'Options'}
            style={{
              padding: '0',
              minWidth: 'initial',
              boxShadow: '0 0 transparent',
            }}
            callback={() => {
              setOptionsOpen(true)
            }}
            underline={true}
          />
        </div>
      </div>
      {optionsOpen && (
        <Options settingsSetter={setter} activeSetter={setOptionsOpen} />
      )}
    </>
  )
}
