import styles from './inputs.module.css'
import { CSSProperties, useContext } from 'react'
import { soundContext } from '@/lib/context'
import classNames from 'classnames/bind'

export default function Button({
  name,
  active,
  color,
  style,
  callback,
  disabled,
  underline,
}: {
  name: string
  active?: boolean
  color?: 'red' | 'blue' | 'orange'
  style?: CSSProperties
  callback: () => void
  disabled?: boolean
  underline?: boolean
}) {
  const sounds = useContext(soundContext)
  const play = sounds['buttonSound']

  const cx = classNames.bind(styles)
  const classes = cx('button', color, {
    underline: underline,
  })

  return (
    <div className={styles.buttonContainer}>
      <div
        className={styles.buttonTriangle}
        style={{
          borderColor: `var(--${color}) transparent transparent transparent`,
          display: active ? 'block' : 'none',
        }}
      />

      <button
        className={classes}
        style={style}
        onClick={() => {
          callback()
          play()
        }}
        disabled={disabled == undefined ? false : disabled}
      >
        {name}
      </button>
    </div>
  )
}
