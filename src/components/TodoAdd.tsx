import { useTodos } from '../store/useTodos'
import { useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
export const TodoAdd = () => {
  const { addTodo } = useTodos()
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={() => addTodo({ id: uuidV4(), content: inputValue, completed: false })}>
        add
      </button>
    </div>
  )
}
