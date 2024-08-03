import styles from './inputs.module.css'
import React from 'react'

export default function InputContainer({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputContainerLabel}>{label}</div>
      {children}
    </div>
  )
}
