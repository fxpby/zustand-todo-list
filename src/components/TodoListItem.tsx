import { Todo } from './../models/todo'
import { useTodos } from './../store/useTodos'
type TTodoItemProps = {
  todoItem: Todo
}

export const TodoListItem = ({ todoItem }: TTodoItemProps) => {
  const { updateTodoType } = useTodos()
  const done = todoItem.completed ? 'done' : ''
  return (
    <div className={done}>
      <label>
        <input
          type="checkbox"
          checked={todoItem.completed}
          onChange={() => updateTodoType(todoItem)}
        />
        <span>{todoItem.content}</span>
      </label>
    </div>
  )
}
