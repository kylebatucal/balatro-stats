'use client'

import { initalizeSettings } from './lib/settings'
import { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
import useSound from 'use-sound'
import { initialProfile } from '@/app/lib/profile'
import Hero from '@/app/components/sections/Hero'
import NavBar from '@/app/components/sections/NavBar'
import Records from '@/app/components/sections/records/Records'
import Collection from '@/app/components/sections/collection/Collection'
import Footer from '@/app/components/sections/Footer'
import { settingsContext, soundContext } from '@/app/lib/context'

export default function Page() {
  // Initalize and update profile
  const [profile, setProfile] = useState(initialProfile)
  const [saved, setSaved] = useState(false)
  useEffect(() => {
    const savedProfile = localStorage.getItem('profile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
      setSaved(true)
    }
  }, [setProfile])

  // Initalize and update settings
  const [settings, setSettings] = useImmer(initalizeSettings())
  useEffect(() => {
    const savedSettings = localStorage.getItem('settings')
    if (savedSettings) {
      const parsedSettings: Record<string, boolean> = JSON.parse(savedSettings)
      setSettings((draft) => {
        Object.entries(parsedSettings).forEach(([setting, enabled]) => {
          if (draft[setting] !== undefined) {
            draft[setting].enabled = enabled
          }
        })
      })
    }
  }, [settings, setSettings])

  // Initalize sounds
  // This prevents us creating a new sound function every time we create a component using a sound
  const [buttonSound] = useSound('/sounds/button.mp3', {
    volume: 0.3,
    playbackRate: 0.95,
    soundEnabled: settings.soundEnabled.enabled,
  })
  const [cardSound] = useSound('/sounds/paper1.mp3', {
    volume: 0.5,
    soundEnabled: settings.soundEnabled.enabled,
  })
  const [chipSound] = useSound('/sounds/chips1.mp3', {
    volume: 0.3,
    soundEnabled: settings.soundEnabled.enabled,
  })
  const [tarotSound] = useSound('/sounds/tarot2.mp3', {
    volume: 0.66,
    soundEnabled: settings.soundEnabled.enabled,
  })
  const sounds = {
    buttonSound: buttonSound,
    cardSound: cardSound,
    chipSound: chipSound,
    tarotSound: tarotSound,
  }

  return (
    <settingsContext.Provider value={settings}>
      <soundContext.Provider value={sounds}>
        <main>
          <Hero saved={saved} profileSetter={setProfile} />
          <NavBar profile={profile} setter={setSettings} />
          <Records profile={profile} />
          <Collection profile={profile} />
          <Footer />
        </main>
      </soundContext.Provider>
    </settingsContext.Provider>
  )
}
