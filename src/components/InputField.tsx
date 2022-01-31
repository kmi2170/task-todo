import { useRef } from "react"
import styles from "./InputField.module.css"

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form className={styles.input} onSubmit={(e) => {
      handleAdd(e)
      inputRef.current?.blur()
    }}
    >
      <input type="input"
        ref={inputRef}
        value={todo}
        onChange={
          (e) => setTodo(e.target.value)
        }
        placeholder="Enter a task"
        className={styles.input__box} />
      <button type="submit" className={styles.input_submit}>Go</button>
    </form  >
  )
}


export default InputField

