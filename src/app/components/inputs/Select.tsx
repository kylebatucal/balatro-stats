import styles from '@/app/styles/inputs.module.css'
import { useState, useContext, useEffect, useRef, KeyboardEvent, Dispatch, SetStateAction } from 'react'
import { soundContext } from '@/app/lib/context'
import Combobox from './Combobox'

function getAction(e: KeyboardEvent, popupOpen: boolean) {
  const {key, altKey, ctrlKey, metaKey} = e
  if (altKey) {
    if (key == 'ArrowUp') {
      if (popupOpen) {
        return 'close'
      }
      return null
    }
    if (key == 'ArrowDown') {
      return 'open'
    }
  }

  switch(key) {
    case 'Escape':
      return 'close'
    case ' ':
    case 'Enter':
      if (popupOpen) {
        return 'close'
      } else {
        return 'open'
      }
    case 'ArrowUp':
      return 'up'
    case 'ArrowDown':
      return 'down'
    case 'PageUp':
    case 'Home':
      return 'first'
    case 'PageDown':
    case 'End':
      return 'last'
  }

  if (key.length == 1 && key != 'Tab' && !altKey && !ctrlKey && !metaKey) {
    return 'type'
  }

  return null
}

export default function Select({
  options,
  current,
  setCurrent,
  color
}: {
  options: string[]
  current: string
  setCurrent: Dispatch<SetStateAction<string>>
  color: 'orange' | 'green'
}) {
  const [popupOpen, setPopupOpen] = useState(false)
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchString('')
    }, 1000)

    return () => clearTimeout(timeout)
  }, [searchString])
  
  const inputRef = useRef<HTMLDivElement>(null)

  const sounds = useContext(soundContext)
  const playButtonSound = sounds['buttonSound']
  const playCardSound = sounds['cardSound']

  return (
    <Combobox
      options={options}
      current={current}
      popupOpen={popupOpen}
      setPopupOpen={setPopupOpen}
      inputRef={inputRef}
      optionCallback={(option) => setCurrent(option)}
    >
      <div
        className={[styles.select, color, `${color}Focus`].join(' ')}
        ref={inputRef}
        tabIndex={0}
        onKeyDown={(e) => {
          const action = getAction(e, popupOpen)
          let newIndex = 0

          switch(action) {
            case 'open':
              e.preventDefault()
              if (!popupOpen) {
                playButtonSound()
              }
              break
            case 'close':
              e.preventDefault()
              if (popupOpen) {
                playButtonSound()
              }
              break
            case 'up':
            case 'down':
            case 'first':
            case 'last':
              e.preventDefault()
              playCardSound({playbackRate: Math.random()*0.2 + 0.9})
              break
          }

          switch(action) {
            case 'type':
              setPopupOpen(true)

              const newSearchString = searchString + e.key
              setSearchString(newSearchString)

              let matches = options.filter((option) => option.toLowerCase().startsWith(newSearchString[0]))

              if (matches.length == 0) {
                return
              } else if (newSearchString.split('').every((letter) => letter == newSearchString[0])) {
                setCurrent(matches[(newSearchString.length - 1) % matches.length])
              } else {
                matches = options.filter((option) => option.toLowerCase().startsWith(newSearchString))
                if (matches[0]) {
                  setCurrent(matches[0])
                }
              }
              break

            case 'open':
              setPopupOpen(true)
              break
            case 'close':
              setPopupOpen(false)
              break
            case 'up':
              newIndex = Math.max(options.indexOf(current) - 1 , 0)
              setCurrent(options[newIndex])
              break
            case 'down':
              newIndex = Math.min(options.indexOf(current) + 1, options.length - 1)
              setCurrent(options[newIndex])
              break
            case 'first':
              newIndex = 0
              setCurrent(options[newIndex])
              break
            case 'last':
              newIndex = options.length - 1
              setCurrent(options[newIndex])
              break
          }
        }}
      >
        {current}
      </div>
    </Combobox>
  )
}