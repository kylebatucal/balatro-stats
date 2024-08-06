import styles from './popup.module.css'
import { Dispatch, SetStateAction } from 'react'
import Button from '../../inputs/Button'

export default function Popup({
  children,
  setter,
}: {
  children: React.ReactNode
  setter: Dispatch<SetStateAction<boolean>>
}) {
  const exit = () => {
    setter(false)
  }

  return (
    <>
      <div className={styles.background} onClick={exit} />

      <div className={styles.popup}>
        {children}
        <Button
          name={'Back'}
          color={'orange'}
          full={true}
          callback={exit}
        />
      </div>
    </>
  )
}
