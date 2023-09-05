import { create } from 'zustand'
import { Todo } from '../models/todo'

type TTodosState = {
  todosArr: Todo[]
  addTodo: (todoItem: Todo) => void
  fetchTodos: () => void
  updateTodoProperty: (todoItem: Todo, property: keyof Todo, value?: string) => void
  deleteTodo: (todoItem: Todo, isDeleteAll?: boolean) => void
}

export const useTodos = create<TTodosState>((set, get) => ({
  todosArr: [],
  addTodo: todoItem => {
    const { content } = todoItem
    if (content.length) {
      set(state => ({
        todosArr: [...state.todosArr, todoItem],
      }))
    } else {
      window.confirm('请输入内容哦')
    }
  },
  fetchTodos: async () => {
    const defaultData: Todo[] = [
      {
        id: '1',
        content: 'olu',
        completed: false,
        isDeleted: false,
      },
      {
        id: '2',
        content: 'cookie',
        completed: true,
        isDeleted: false,
      },
      {
        id: '3',
        content: 'hhh',
        completed: false,
        isDeleted: false,
      },
    ]
    const localTodosArr: Todo[] = JSON.parse(
      localStorage.getItem('todosArr') || JSON.stringify(defaultData),
    )

    if (localTodosArr.length) {
      set(state => ({
        todosArr: [...state.todosArr, ...localTodosArr],
      }))
    }
  },
  updateTodoProperty: (todoItem, property, value) => {
    const item = get().todosArr.find(x => x.id === todoItem.id) as Todo
    let target: Todo[keyof Todo] = item[property]
    if (item && typeof target === 'boolean') {
      target = !target
      set(state => ({
        todosArr: [...state.todosArr],
      }))
    } else if (item && value && typeof target === 'string') {
      target = value
    }
  },
  deleteTodo: ({ id }, isDeleteAll = false) => {
    if (isDeleteAll) {
      set(() => ({
        todosArr: [],
      }))
    } else {
      set(state => ({
        todosArr: state.todosArr.map(item => {
          if (id === item.id) {
            item.isDeleted = true
          }
          return item
        }),
      }))
    }
  },
}))
