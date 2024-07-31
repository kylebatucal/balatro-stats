import styles from '@/app/styles/sections/navbar.module.css'
import { Profile } from '@/app/lib/types'
import { Options } from './Options'
import { useState } from 'react'
import { Updater } from 'use-immer'
import Button from '../inputs/Button'
import Tooltip from '../pieces/Tooltip'


export default function NavBar({
  profile,
  setter
}: {
  profile: Profile
  setter: Updater<Record<string, {label: string, enabled: boolean}>>
}) {
  const [active, setActive] = useState(false)

  return (
    <>
      <div className={styles.navbar}>
        <>
          {`${profile.name}'s stats`}
          {profile.lastUpdated && ` [${profile.lastUpdated}]`}
        </>

        <div className={styles.buttons}>
          {/* <Tooltip
            desc={'Log in with Discord to share your profile'}
          >
            <Button
              name={'Share'}
              style={{
                padding: '0',
                minWidth: 'initial',
                boxShadow: '0 0 transparent',
              }}
              callback={() => {

              }}
              underline={true}
            />
          </Tooltip> */}
          <Button
            name={'Options'}
            style={{
              padding: '0',
              minWidth: 'initial',
              boxShadow: '0 0 transparent',
            }}
            callback={() => {
              setActive(true)
            }}
            underline={true}
          />
        </div>
      </div>
      {active && <Options settingsSetter={setter} activeSetter={setActive}/>}
    </>
  )
}
