import styles from '@/app/styles/sections/options.module.css'
import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { settingsContext } from '@/app/lib/context'
import Button from '../inputs/Button'
import { Checkbox } from '../inputs/Checkbox'
import { Updater } from 'use-immer'

function minifySettings(
  settings: Record<string, { label: string; enabled: boolean }>,
) {
  // Compress the settings to only keep the boolean value
  const miniSettings: Record<string, boolean> = {}
  Object.entries(settings).forEach(([key, { enabled }]) => {
    miniSettings[key] = enabled
  })
  return JSON.stringify(miniSettings)
}

export function Options({
  activeSetter,
  settingsSetter,
}: {
  activeSetter: Dispatch<SetStateAction<boolean>>
  settingsSetter: Updater<Record<string, { label: string; enabled: boolean }>>
}) {
  const settings = useContext(settingsContext)

  useEffect(() => {
    localStorage.setItem('settings', minifySettings(settings))
  }, [settings])

  const exitMenu = () => {
    activeSetter(false)
  }

  return (
    <>
      <div className={styles.background} onClick={exitMenu} />

      <div className={styles.options}>
        <div className={styles.section}>
          <div className={styles.sectionHeading}>Settings</div>

          <div>
            {Object.entries(settings).map(([key, { label, enabled }]) => {
              return (
                <Checkbox
                  key={label}
                  label={label}
                  checked={enabled}
                  callback={() => {
                    settingsSetter((draft) => {
                      draft[key].enabled = !enabled
                    })
                  }}
                />
              )
            })}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeading}>Credits</div>

          <div
            style={{
              textAlign: 'center',
            }}
          >
            <ul>Fan website by Kyle Batucal</ul>
            <ul>
              <a className={styles.link} href="https://www.playbalatro.com/">
                Balatro
              </a>{' '}
              created by LocalThunk
            </ul>
            <ul>
              <a className={styles.link} href="https://managore.itch.io/m6x11">
                m6x11.tff
              </a>{' '}
              font by Daniel Linssen
            </ul>
          </div>
        </div>

        <Button
          name={'Back'}
          color={'orange'}
          style={{ width: '100%' }}
          callback={exitMenu}
        />
      </div>
    </>
  )
}
