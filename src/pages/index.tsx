import type { NextPage } from 'next'

import InputField from "../components/InputField"
import TodoList from '../components/TodoList';
import { Todo } from "../api/types";

import styles from '../../styles/Home.module.css'
import { useState } from 'react'


const Home: NextPage = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo("")
    }
  }

  console.log(todos)

  return (
    <div className={styles.appContainer}>
      <span className={styles.heading}>
        My Tasks
      </span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default Home
