import type { NextPage } from 'next'
import { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import InputField from "../components/InputField"
import TodoList from '../components/TodoList';
import { Todo } from "../api/types";

import styles from '../../styles/Home.module.css'


const Home: NextPage = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
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
