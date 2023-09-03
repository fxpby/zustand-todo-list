import { TodoListItem } from './TodoListItem'
import { useTodos } from '../store/useTodos'
import { useFiltered } from '../store/useFiltered'
import { useEffect, useRef } from 'react'

export const TodoList = () => {
  const { todosArr, fetchTodos } = useTodos()
  const { filter, filteredTodos } = useFiltered()
  const renderRef = useRef<boolean>(true)

  useEffect(() => {
    if (renderRef.current) {
      fetchTodos()
      renderRef.current = false
      return
    }
  }, [])

  return (
    <div className="todo-list-wrapper">
      {filteredTodos(filter, todosArr).map(todo => (
        <TodoListItem key={todo.id} todoItem={todo} />
      ))}
    </div>
  )
}
