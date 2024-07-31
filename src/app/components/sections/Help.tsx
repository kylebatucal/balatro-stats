import styles from '@/app/styles/sections/options.module.css'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import Button from '../inputs/Button'

function Highlight({
  children,
  color,
}: {
  children: ReactNode
  color?: string
}) {
  if (color === undefined) {
    color = 'orange'
  }

  return (
    <span
      style={{
        color: `var(--${color})`,
      }}
    >
      {children}
    </span>
  )
}

export default function Help({
  setter,
}: {
  setter: Dispatch<SetStateAction<boolean>>
}) {
  const exitMenu = () => {
    setter(false)
  }
  return (
    <>
      <div className={styles.background} onClick={exitMenu} />

      <div className={styles.options}>
        <div className={styles.section}>
          <div className={styles.sectionHeading}>
            Where to find your profile.jkr
          </div>
          <div className={styles.subSections}>
            <div>
              Windows:
              <ol className={styles.list}>
                <li>Open File Explorer and click the address bar</li>
                <li>
                  Type: <Highlight color={'blue'}>%AppData%/Balatro</Highlight>
                </li>
                <li>
                  Press <Highlight>[Enter]</Highlight>
                </li>
                <li>Choose from folder 1, 2, or 3</li>
              </ol>
            </div>

            <div>
              MacOS:
              <ol className={styles.list}>
                <li>Open Finder</li>
                <li>
                  Press <Highlight>[Shift]</Highlight> +{' '}
                  <Highlight>[Command]</Highlight> + <Highlight>[G]</Highlight>
                </li>
                <li>
                  Type:{' '}
                  <Highlight color={'blue'}>
                    ~/Library/Application Support/Balatro
                  </Highlight>
                </li>
                <li>
                  Press <Highlight>[Enter]</Highlight>
                </li>
                <li>Choose from folder 1, 2, or 3</li>
              </ol>
            </div>

            <div>
              Steam Deck:
              <ol className={styles.list}>
                <li style={{ overflowWrap: 'anywhere' }}>
                  Navigate to:{' '}
                  <Highlight color={'blue'}>
                    ~/.local/share/Steam/steamapps/compatdata/2379780/pfx/drive_c/users/steamuser/AppData/Roaming/Balatro
                  </Highlight>
                </li>
                <li>Choose from folder 1, 2, or 3</li>
              </ol>
            </div>
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
