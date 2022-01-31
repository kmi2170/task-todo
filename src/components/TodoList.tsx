import { Todo } from "../api/types";
import SingleTodo from "./SingleTodo";

import styles from "./TodoList.module.css"

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.todos}>
        <span className={styles.todos__heading}>
          Active
        </span>
        {todos.map(todo => (
          <SingleTodo
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos} />
        ))}
      </div>
      <div className={`${styles.todos} ${styles.remove}`}>
        <span className={styles.todos__heading}>
          Completed
        </span>
        {todos.map(todo => (
          <SingleTodo
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos} />
        ))}
      </div>
    </div >
  )
}

export default TodoList
