import styles from './navbar.module.css'
import { Profile } from '@/lib/types'
import { Options } from '../popups/Options'
import { useState } from 'react'
import { Updater } from 'use-immer'
import Button from '../../inputs/Button'
import Login from '../popups/LogIn'

export default function NavBar({
  profile,
  setter,
}: {
  profile: Profile
  setter: Updater<Record<string, { label: string; enabled: boolean }>>
}) {
  const [shareOpen, setShareOpen] = useState(false)
  const [optionsOpen, setOptionsOpen] = useState(false)

  return (
    <>
      <div className={styles.navbar}>
        <>
          {`${profile.name}'s stats`}
          {profile.lastUpdated && ` [${profile.lastUpdated}]`}
        </>

        <div className={styles.buttons}>
          {/* <Button
            name={'Share'}
            style={{
              padding: '0',
              minWidth: 'initial',
              boxShadow: '0 0 transparent',
            }}
            callback={() => {
              setShareOpen(true)
            }}
            underline={true}
          /> */}
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
      {shareOpen && <Login setter={setShareOpen} />}
      {optionsOpen && (
        <Options settingsSetter={setter} activeSetter={setOptionsOpen} />
      )}
    </>
  )
}
