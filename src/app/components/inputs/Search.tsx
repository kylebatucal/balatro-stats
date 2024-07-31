import styles from '@/app/styles/inputs.module.css'
import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react'
import { soundContext } from '@/app/lib/context'
import Combobox from './Combobox'

function getAction(e: KeyboardEvent, popupOpen: boolean) {
  const { key, altKey, ctrlKey } = e
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

  if (ctrlKey) {
    if (key == 'Home') {
      return 'first'
    }
    if (key == 'End') return 'last'
  }

  switch (key) {
    case 'Escape':
      return 'clear'
    case 'Enter':
      return 'submit'
    case 'ArrowUp':
      return 'up'
    case 'ArrowDown':
      return 'down'
    case 'PageUp':
      return 'pageUp'
    case 'PageDown':
      return 'pageDown'
  }

  return null
}

export default function Search({
  options,
  current,
  setCurrent,
  placeholder,
}: {
  options: string[]
  current: string
  setCurrent: Dispatch<SetStateAction<string>>
  placeholder: string
}) {
  const [popupOpen, setPopupOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const pageSize = 15
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(current.toLowerCase()),
  )
  const inputRef = useRef<HTMLInputElement>(null)

  const sounds = useContext(soundContext)
  const playButtonSound = sounds['buttonSound']
  const playCardSound = sounds['cardSound']

  return (
    <Combobox
      options={filteredOptions}
      current={selected}
      popupOpen={popupOpen}
      setPopupOpen={setPopupOpen}
      inputRef={inputRef}
      optionCallback={(option) => {
        setCurrent(option)
        setSelected(option)
      }}
    >
      <input
        className={[styles.select, 'blue', 'blueFocus'].join(' ')}
        name={`Search ${placeholder}`}
        type="input"
        ref={inputRef}
        value={current}
        placeholder={placeholder}
        onChange={(e) => {
          setCurrent(e.target.value)
          setSelected(e.target.value)
        }}
        onKeyDown={(e) => {
          const action = getAction(e, popupOpen)
          let newIndex = 0

          switch (action) {
            case 'open':
            case 'submit':
              if (!popupOpen) {
                playButtonSound()
              }
              break
            case 'close':
              if (popupOpen) {
                playButtonSound()
              }
              break
            case 'up':
            case 'down':
            case 'pageUp':
            case 'pageDown':
            case 'first':
            case 'last':
              e.preventDefault()
              if (!popupOpen) {
                setPopupOpen(true)
              }
              playCardSound({ playbackRate: Math.random() * 0.2 + 0.9 })
              break
          }

          switch (action) {
            case 'open':
              setPopupOpen(true)
              break
            case 'close':
              setPopupOpen(false)
              break
            case 'submit':
              setPopupOpen(false)
              setCurrent(selected)
              break

            case 'clear':
              if (popupOpen) {
                setPopupOpen(false)
              } else {
                setCurrent('')
              }
              setSelected(current)
              break

            case 'up':
              newIndex = Math.max(filteredOptions.indexOf(selected) - 1, 0)
              setSelected(filteredOptions[newIndex])
              break
            case 'down':
              newIndex = Math.min(
                filteredOptions.indexOf(selected) + 1,
                filteredOptions.length - 1,
              )
              setSelected(filteredOptions[newIndex])
              break
            case 'pageUp':
              newIndex = Math.max(
                filteredOptions.indexOf(selected) - pageSize,
                0,
              )
              setSelected(filteredOptions[newIndex])
              break
            case 'pageDown':
              newIndex = Math.min(
                filteredOptions.indexOf(selected) + pageSize,
                filteredOptions.length - 1,
              )
              setSelected(filteredOptions[newIndex])
              break
            case 'first':
              newIndex = 0
              setSelected(filteredOptions[newIndex])
              break
            case 'last':
              newIndex = filteredOptions.length - 1
              setSelected(filteredOptions[newIndex])
              break
          }
        }}
      />
    </Combobox>
  )
}
