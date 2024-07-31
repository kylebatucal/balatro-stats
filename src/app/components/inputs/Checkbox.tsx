import styles from '@/app/styles/inputs.module.css'
import { useContext } from 'react'
import { soundContext } from '@/app/lib/context'

export function Checkbox({
  label,
  checked,
  callback,
}: {
  label: string
  checked: boolean
  callback: () => void
}) {
  const sounds = useContext(soundContext)
  const play = sounds['buttonSound']

  return (
    <div className={styles.checkbox}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        name={label}
        checked={checked}
        onChange={() => {
          play()
          callback()
        }}
      />
      <div className={styles.checkboxLabel}>{label}</div>
    </div>
  )
}
