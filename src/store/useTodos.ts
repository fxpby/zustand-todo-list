import { create } from 'zustand'
import { Todo } from '../models/todo'

type TTodosState = {
  todosArr: Todo[]
  addTodo: (todoItem: Todo) => void
  fetchTodos: () => void
  updateTodoType: (todoItem: Todo) => void
}

export const useTodos = create<TTodosState>((set, get) => ({
  todosArr: [],
  addTodo: todoItem =>
    set(state => ({
      todosArr: [...state.todosArr, todoItem],
    })),
  fetchTodos: async () => {
    const defaultData: Todo[] = [
      {
        id: '1',
        content: 'olu',
        completed: false,
      },
      {
        id: '2',
        content: 'cookie',
        completed: true,
      },
      {
        id: '3',
        content: 'hhh',
        completed: false,
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
  updateTodoType: todoItem => {
    const item = get().todosArr.find(x => x.id === todoItem.id)

    if (item) {
      item.completed = !todoItem.completed
      set(state => ({
        todosArr: [...state.todosArr],
      }))
    }
  },
}))
