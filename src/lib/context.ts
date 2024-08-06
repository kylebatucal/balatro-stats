import { createContext } from 'react'
import { initializeSettings } from './settings'

// prettier-ignore
export const soundContext = createContext<Record<string, ({}?) => void>>({})
export const settingsContext = createContext(initializeSettings())
