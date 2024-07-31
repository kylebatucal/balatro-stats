export function initalizeSettings(): Record<string, {label: string, enabled: boolean}> {
  return {
    soundEnabled: {
      label: 'Enable sound',
      enabled: true
    },
    cardPerspective: {
      label: 'Enable card perspective effect',
      enabled: true
    },
    showPerGameStats: {
      label: 'Show per-game averages in career stats',
      enabled: true
    },
    // slideAnimation: {
    //   label: 'Enable slide animation on filters',
    //   enabled: false
    // },
    fadeCardsWithNoRounds: {
      label: 'Fade unplayed cards',
      enabled: false
    },
    fadeCardsWithNoWins: {
      label: 'Fade cards with no wins',
      enabled: false
    },
    highlightChipsOnlyIfWin: {
      label: 'Highlight chips with wins only',
      enabled: false
    },
    saveImageinNewTab: {
      label: 'Open saved images in new tab',
      enabled: false
    }
    // disableOverwriteConfirmation: {
    //   label: 'Disable profile overwrite confirmation prompt',
    //   enabled: false
    // },
  }
}
