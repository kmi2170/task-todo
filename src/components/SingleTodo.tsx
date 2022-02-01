import { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

import { Todo } from "../api/types"
import styles from "./SingleTodo.module.css"

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
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

  const handleMouseOver = (setState: React.Dispatch<React.SetStateAction<boolean>>) => setState(true)

  const handleMouseLeave = (setState: React.Dispatch<React.SetStateAction<boolean>>) => setState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot) => (
          <form
            className={
              `${styles.todos__single} 
            ${snapshot.isDragging ? styles.drag : ""}`
            }
            onSubmit={(e) => handleEdit(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
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

                <div className={styles.tooltip} >
                  <span >
                    <AiFillEdit />
                  </span>
                  <span className={styles.tooltiptext}>
                    Edit
                  </span>
                </div>

              </span>

              <div className={styles.tooltip} >
                <span className={styles.icon} onClick={() => handleDelete(todo.id)}
                >
                  <AiFillDelete />
                </span>
                <span className={styles.tooltiptext}>
                  Delete
                </span>
              </div>

              <div className={styles.tooltip} >
                <span className={styles.icon} onClick={() => handleDone(todo.id)}>
                  <MdDone />
                </span>
                <span className={styles.tooltiptext}>
                  Done
                </span>
              </div>
            </div>
          </form >
        )
      }
    </Draggable >
  )
}

export default SingleTodo
