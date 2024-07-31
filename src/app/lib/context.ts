import { createContext } from 'react'
import { initalizeSettings } from './settings'

export const soundContext = createContext<Record<string, ({}) => void>>({})
export const settingsContext = createContext(initalizeSettings())
