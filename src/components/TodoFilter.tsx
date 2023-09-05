import { useFiltered } from './../store/useFiltered'
import s from './TodoFilter.module.less'

export const TodoFilter = () => {
  const { filterList, updateActiveFilter } = useFiltered()
  const isActive = (flag: boolean) => (flag ? 'activeFilter' : '')

  return (
    <div className={s.filterWrapper}>
      {filterList.map(filter => (
        <span
          onClick={() => updateActiveFilter(filter.value)}
          className={s[isActive(filter.isActive)]}
          key={filter.label}
        >
          {filter.label}
        </span>
      ))}
    </div>
  )
}
