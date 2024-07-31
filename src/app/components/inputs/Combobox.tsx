import styles from '@/app/styles/inputs.module.css'
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { soundContext } from '@/app/lib/context'

export default function Combobox({
  children,
  options,
  current,
  popupOpen,
  setPopupOpen,
  inputRef,
  optionCallback,
}: {
  children: React.ReactNode
  options: string[]
  current: string
  popupOpen: boolean
  setPopupOpen: Dispatch<SetStateAction<boolean>>
  inputRef: RefObject<any>
  optionCallback?: (option: string) => void
}) {
  const sounds = useContext(soundContext)
  const playButtonSound = sounds['buttonSound']
  const playCardSound = sounds['cardSound']

  // Make sure the options scroll
  const optionsRef = useRef<HTMLUListElement>(null)
  useEffect(() => {
    if (optionsRef.current) {
      const currentIndex = options.indexOf(current)
      if (current && currentIndex != -1 && popupOpen) {
        const optionsNode =
          optionsRef.current.querySelectorAll('li')[currentIndex]
        optionsNode.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [options, current, popupOpen])

  return (
    <div
      className={styles.dropdown}
      onClick={() => {
        playButtonSound()
        setPopupOpen(!popupOpen)
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setPopupOpen(false)
        }
      }}
    >
      {children}

      <div
        className={styles.optionsContainer}
        style={{
          gridTemplateRows: `${popupOpen ? '1fr' : '0fr'}`,
        }}
      >
        <ul
          className={styles.options}
          ref={optionsRef}
          style={{
            padding: popupOpen ? (options.length ? '0.5rem' : 0) : '0 0.5rem',
          }}
        >
          {options.map((option, i) => {
            return (
              <li
                key={option}
                className={`${styles.option}${current.toLowerCase() == option.toLowerCase() ? ` ${styles.current}` : ''}`}
                tabIndex={-1}
                onClick={() => {
                  if (optionCallback !== undefined) {
                    optionCallback(options[i])
                  }
                  setPopupOpen(false)
                  if (inputRef.current) {
                    inputRef.current.focus()
                  }
                }}
                onPointerEnter={() =>
                  playCardSound({ playBackRate: Math.random() * 0.2 + 0.9 })
                }
              >
                {option}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
