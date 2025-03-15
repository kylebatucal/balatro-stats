'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      style={{
        padding: '1rem',
        fontSize: '75%',
        backgroundColor: '#374244',
        height: '100vh',
      }}
    >
      <h1>Oops! Something went wrong:</h1>
      <div
        style={{
          paddingLeft: '1rem',
          paddingBottom: '1rem',
        }}
      >
        {error.message}
      </div>

      <div>
        Crash Reports are set to Off. If you would like to send crash reports,
        please{' '}
        <Link href="https://github.com/kylebatucal/balatro-stats/issues">
          create a new issue in the GitHub
        </Link>
        .
      </div>

      <button
        style={{
          padding: '1rem',
          width: '100%',
        }}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            localStorage.removeItem('profile')
            reset()
          }
        }
      >
        Reset Profile and Try Again
      </button>
    </div>
  )
}
