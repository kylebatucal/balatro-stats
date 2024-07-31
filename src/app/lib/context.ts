import { createContext } from 'react'
import { initalizeSettings } from './settings'

// prettier-ignore
export const soundContext = createContext<Record<string, ({}?) => void>>({})
export const settingsContext = createContext(initalizeSettings())
