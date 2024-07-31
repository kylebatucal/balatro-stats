import styles from '@/app/styles/inputs.module.css'
import { useContext } from 'react'
import { soundContext } from '@/app/lib/context'

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
  style?: Record<string, string | number>
  callback: () => void,
  disabled?: boolean
  underline?: boolean
}) {
  const sounds = useContext(soundContext)
  const play = sounds['buttonSound']
  
  const classes = [styles.button]
  color && classes.push(color)
  underline && classes.push(styles.underline)

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
        className={classes.join(' ')}
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
