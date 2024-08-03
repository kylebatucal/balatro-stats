import styles from './popup.module.css'
import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { settingsContext } from '@/lib/context'
import Checkbox from '../../inputs/Checkbox'
import { Updater } from 'use-immer'
import Popup from './Popup'

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

  return (
    <Popup setter={activeSetter}>
      <>
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
          <ul
            style={{
              textAlign: 'center',
            }}
          >
            <li>Fan website by Kyle Batucal</li>
            <li>
              <a className={styles.link} href="https://www.playbalatro.com/">
                Balatro
              </a>{' '}
              created by LocalThunk
            </li>
            <li>
              <a className={styles.link} href="https://managore.itch.io/m6x11">
                m6x11.tff
              </a>{' '}
              font by Daniel Linssen
            </li>
          </ul>
        </div>
      </>
    </Popup>
  )
}
