import { Todo } from './../models/todo'
import { useTodos } from './../store/useTodos'
import s from './TodoListItem.module.less'
type TTodoItemProps = {
  todoItem: Todo
}

export const TodoListItem = ({ todoItem }: TTodoItemProps) => {
  const { updateTodoProperty, deleteTodo } = useTodos()
  const done = todoItem.completed ? 'done' : ''
  return (
    <div className={`${s[done]}`}>
      <label>
        <input
          type="checkbox"
          checked={todoItem.completed}
          onChange={() => updateTodoProperty(todoItem, 'completed')}
        />
        <span>{todoItem.content}</span>
        {todoItem.isDeleted ? (
          <button onClick={() => updateTodoProperty(todoItem, 'isDeleted')}>recover</button>
        ) : (
          <button onClick={() => deleteTodo(todoItem)}>x</button>
        )}
      </label>
    </div>
  )
}
