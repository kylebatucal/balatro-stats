import styles from './popup.module.css'
import { Dispatch, SetStateAction } from 'react'
import Popup from './Popup'
import { signIn } from 'next-auth/react'

export default function Login({
  setter,
}: {
  setter: Dispatch<SetStateAction<boolean>>
}) {
  return <Popup setter={setter}>Log in with Discord to share your stats.</Popup>
}
