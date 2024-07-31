import styles from '@/app/styles/sections/hero.module.css'
import { initialProfile, readProfile } from '@/app/lib/profile'
import { Profile } from '@/app/lib/types'
import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useContext,
  useEffect,
} from 'react'
import Button from '../inputs/Button'
import { soundContext } from '@/app/lib/context'
import Help from './Help'

export default function Hero({
  saved,
  profileSetter,
}: {
  saved: boolean
  profileSetter: Dispatch<SetStateAction<Profile>>
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [confirm, setConfirm] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [help, setHelp] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setConfirm(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [confirm])

  const sounds = useContext(soundContext)
  const play = sounds['tarotSound']

  return (
    <>
      <div className={styles.hero}>
        <h1
          style={{
            fontSize: '200%',
            lineHeight: 1.5,
            textAlign: 'center',
          }}
        >
          Balatro Stats
        </h1>

        <div
          style={{
            textAlign: 'center',
          }}
        >
          <p>View your stats in Balatro!</p>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center',
            }}
          >
            Upload your profile.jkr to begin.
            <Button
              name={'(?)'}
              style={{
                padding: '0',
                minWidth: 'initial',
                boxShadow: '0 0 transparent',
              }}
              callback={() => {
                setHelp(true)
              }}
              underline={true}
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <div>
            <input
              className={styles.input}
              ref={inputRef}
              type="file"
              accept=".jkr"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  readProfile(file, (profile: Profile) => {
                    const date = new Date().toLocaleDateString()
                    profile.lastUpdated = date
                    profileSetter(profile)
                    localStorage.setItem('profile', JSON.stringify(profile))
                  })
                }
              }}
            />
            <Button
              name={saved ? 'Update Profile' : 'Upload Profile'}
              color={'blue'}
              style={{
                padding: '0.5rem 2.5rem',
                fontSize: '125%',
              }}
              callback={() => {
                if (inputRef.current) {
                  inputRef.current.click()
                }
              }}
            />
          </div>

          <div>
            <Button
              name={'Reset Profile'}
              color={'red'}
              style={{
                padding: '0.25rem 1.5rem',
              }}
              callback={() => {
                if (confirm) {
                  // Reset Profile
                  if (inputRef.current) {
                    inputRef.current.value = ''
                    profileSetter(initialProfile)
                  }
                  setConfirm(false)
                  localStorage.removeItem('profile')
                } else {
                  // Ask the user to confirm to reset
                  play({ playbackRate: 1 })
                  setTimeout(() => {
                    play({ playbackRate: 0.76 })
                  }, 60)

                  setConfirm(true)
                  setDisabled(true)
                  setTimeout(() => {
                    setDisabled(false)
                  }, 500)
                }
              }}
              disabled={disabled}
            />
          </div>
        </div>

        <p
          className={`${styles.warning}${confirm ? ` ${styles.animation}` : ''}`}
          style={{
            visibility: confirm ? 'visible' : 'hidden',
          }}
        >
          Click again to confirm
        </p>
      </div>

      {help && <Help setter={setHelp} />}
    </>
  )
}
