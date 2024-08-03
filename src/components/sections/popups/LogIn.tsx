import { Dispatch, SetStateAction } from 'react'
import Popup from './Popup'
import styles from './popup.module.css'

export default function Login({
  setter
}: { 
  setter: Dispatch<SetStateAction<boolean>> 
}) {
  return (
    <Popup setter={setter}>
      Log in with Discord to share your stats.
    </Popup>
  )
}
