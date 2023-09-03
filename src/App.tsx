import { TodoAdd } from './components/TodoAdd'
import { TodoFilter } from './components/TodoFilter'
import { TodoList } from './components/TodoList'
import './App.css'

function App() {
  return (
    <>
      <div className="card">
        <TodoAdd />
        <TodoFilter />
        <TodoList />
      </div>
    </>
  )
}

export default App
