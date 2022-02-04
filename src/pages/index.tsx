import type { NextPage } from 'next'
import { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import InputField from "../components/InputField"
import TodoList from '../components/TodoList';
import { Todo } from "../api/types";

import styles from '../../styles/Home.module.css'

const getInitFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const items = localStorage.getItem(key)

    return items ? JSON.parse(items) : []
  } else {
    return []
  }
}

const Home: NextPage = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>(getInitFromLocalStorage("todos"))
  const [completedTodos, setCompletedTodos] = useState<Todo[]>(getInitFromLocalStorage("completedTodos"))
  // const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
  // const [todos, setTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      const newTodos = [...todos, { id: Date.now(), todo, isDone: false }]
      setTodos(newTodos)
      localStorage.setItem("todos", JSON.stringify(newTodos))
      setTodo("")
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    if (
      source.droppableId === destination.droppableId
      && source.index === destination.index
    ) return

    let add, active = todos, complete = completedTodos

    if (source.droppableId == "TodosList") {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if (destination.droppableId == "TodosList") {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    setCompletedTodos(complete)
    setTodos(active)
    localStorage.setItem("completedTodos", JSON.stringify(complete))
    localStorage.setItem("todos", JSON.stringify(active))
  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.appContainer}>
        <span className={styles.heading}>
          My Tasks
        </span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  )
}

export default Home
