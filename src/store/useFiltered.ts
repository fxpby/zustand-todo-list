import { Todo } from '../models/todo'
import { create } from 'zustand'

export enum filterTypeName {
  all = '全部',
  done = '已完成',
  todo = '未完成',
  deleted = '已删除',
}

type TFilterType = keyof typeof filterTypeName
interface TFilterItem {
  value: TFilterType
  label: string
  isActive: boolean
}

const filterList: TFilterItem[] = [
  {
    value: 'all',
    label: filterTypeName['all'],
    isActive: true,
  },
  {
    value: 'done',
    label: filterTypeName['done'],
    isActive: false,
  },
  {
    value: 'todo',
    label: filterTypeName['todo'],
    isActive: false,
  },
  {
    value: 'deleted',
    label: filterTypeName['deleted'],
    isActive: false,
  },
]

type TFilteredState = {
  filter: TFilterType
  filterList: TFilterItem[]
  filteredTodos: (todosArr: Todo[]) => Todo[]
  updateActiveFilter: (activeValue: TFilterType) => void
}

export const useFiltered = create<TFilteredState>((set, get) => ({
  filter: 'all',
  filterList,
  filteredTodos: todosArr => {
    const filterType = get().filter
    switch (filterType) {
      case 'all':
        return todosArr.filter(todo => !todo.isDeleted)
      case 'todo':
        return todosArr.filter(todo => !todo.completed && !todo.isDeleted)
      case 'done':
        return todosArr.filter(todo => todo.completed && !todo.isDeleted)
      case 'deleted':
        return todosArr.filter(todo => todo.isDeleted)
      default:
        return todosArr
    }
  },
  updateActiveFilter: activeValue =>
    set(state => ({
      filterList: state.filterList.map(item => {
        if (item.value === activeValue) {
          item.isActive = true
        } else {
          item.isActive = false
        }
        return item
      }),
      filter: activeValue,
    })),
}))
