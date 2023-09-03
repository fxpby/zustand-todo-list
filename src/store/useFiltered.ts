import { Todo } from '../models/todo'
import { create } from 'zustand'

type TFilterType = 'all' | 'todo' | 'done'

export enum filterTypeName {
  all = '全部',
  done = '已完成',
  todo = '未完成',
}

// interface filterTypeNameList {
//   all: '全部',
//   done: '已完成',
//   todo: '未完成'
// }

interface TFilterItem {
  value: TFilterType
  label: string
  isActive: boolean
}

const filterList: TFilterItem[] = [
  {
    value: 'all',
    label: '全部',
    isActive: true,
  },
  {
    value: 'done',
    label: '已完成',
    isActive: false,
  },
  {
    value: 'todo',
    label: '未完成',
    isActive: false,
  },
]

type TFilteredState = {
  filter: TFilterType
  filterList: TFilterItem[]
  filteredTodos: (filterType: TFilterType, todosArr: Todo[]) => Todo[]
}

export const useFiltered = create<TFilteredState>(() => ({
  filter: 'all',
  filterList,
  filteredTodos: (filterType, todosArr) => {
    switch (filterType) {
      case 'all':
        return todosArr
      case 'todo':
        return todosArr.filter(todo => !todo.completed)
      case 'done':
        return todosArr.filter(todo => todo.completed)
      default:
        return todosArr
    }
  },
}))
