import { Droppable } from "react-beautiful-dnd";

import { Todo } from "../api/types";
import SingleTodo from "./SingleTodo";

import styles from "./TodoList.module.css"

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
  return (
    <div className={styles.container}>
      <Droppable droppableId="TodosList">
        {
          (provided, snapshot) => (
            <div
              className={
                `${styles.todos}
            ${snapshot.isDraggingOver ? styles.dragactive : ""}`
              }
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className={styles.todos__heading}>
                Active
              </span>
              {todos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos} />
              ))}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {
          (provided, snapshot) => (
            <div
              className={
                `${styles.todos} ${styles.remove} 
              ${snapshot.isDraggingOver ? styles.dragcomplete : ""}`
              }
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className={styles.todos__heading}>
                Completed
              </span>
              {completedTodos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  todo={todo}
                  todos={completedTodos}
                  setTodos={setTodos} />
              ))}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </div >
  )
}

export default TodoList
