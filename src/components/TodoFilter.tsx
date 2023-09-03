import { useFiltered } from './../store/useFiltered'
export const TodoFilter = () => {
  const { filterList } = useFiltered()
  const isActive = (flag: boolean) => (flag ? 'active-filter' : '')
  return (
    <div className="filter-wrapper">
      {filterList.map(filter => (
        <span className={isActive(filter.isActive)} key={filter.label}>
          {filter.label}
        </span>
      ))}
    </div>
  )
}
