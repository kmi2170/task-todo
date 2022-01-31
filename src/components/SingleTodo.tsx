import { useEffect, useRef } from "react";
import { Todo } from "../api/types"
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

import styles from "./SingleTodo.module.css"
import { useState } from "react";

interface Props {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>("")

  const handleDone = (id: number) => {
    setTodos(todos.map(
      (todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    ))
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    setTodos(todos.map((todo) => (
      todo.id === id ? { ...todo, todo: editTodo } : todo
    )))

    setEdit(false)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  return (
    <form className={styles.todos__single} onSubmit={(e) => handleEdit(e, todo.id)}>
      {
        edit ? (
          <input
            ref={inputRef}
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            className={styles.todos__single__text}
          />
        ) : todo.isDone ? (
          <s className={styles.todos__single__text} > {todo.todo}</s>
        ) : (
          <span className={styles.todos__single__text}>{todo.todo}</span>
        )
      }

      <div >
        <span className={styles.icon}
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit)
            }
          }}>
          <AiFillEdit />
        </span>
        <span className={styles.icon} onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className={styles.icon} onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form >
  )
}

export default SingleTodo
