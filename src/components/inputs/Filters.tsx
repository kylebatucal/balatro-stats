import styles from './inputs.module.css'
import { FilterType } from '@/lib/types'
import Button from './Button'
import { Updater } from 'use-immer'
import Checkbox from './Checkbox'
import { useState } from 'react'

export default function Filters({
  filters,
  setFilters,
}: {
  filters: FilterType[]
  setFilters: Updater<Record<string, FilterType>>
}) {
  const [open, setOpen] = useState(false)

  const activeFilterCount = filters
    .map((group) => {
      return Object.values(group.filters)
        .map(({ enabled }) => enabled)
        .filter(Boolean).length
    })
    .reduce((sum, x) => sum + x, 0)

  return (
    <div
      className={styles.filtersContainer}
      style={{
        gridTemplateRows: `min-content ${open ? '1fr' : '0fr'}`,
      }}
    >
      <Button
        name={`${activeFilterCount} ${activeFilterCount != 1 ? 'filters' : 'filter'} applied`}
        color={'red'}
        full={true}
        callback={() => setOpen(!open)}
        disabled={!filters.length}
      />

      <div
        className={styles.filters}
        style={{
          visibility: open ? 'visible' : 'hidden',
          padding: open ? '0.5rem 0.25rem' : '0 0.25rem',
        }}
      >
        {filters.map((group) => {
          return (
            <div key={group.name} className={styles.filterGroup}>
              <div className={styles.filterName}>{group.name}</div>

              <div className={styles.filterOptions}>
                {Object.entries(group.filters).map(([name, { enabled }]) => {
                  return (
                    <Checkbox
                      key={name}
                      label={name}
                      checked={enabled}
                      callback={() => {
                        setFilters((draft) => {
                          draft[group.name].filters[name].enabled = !enabled
                        })
                      }}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
