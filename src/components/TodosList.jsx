import {useQuery, useMutation, useQueryClient} from "react-query"
import {getTodos, addTodos, deleteTodos, updateTodos} from "../api/todosApi"
import {useState} from "react"

const TodosList = () => {
  const [newTodo, setNewTodo] = useState("")
  const queryClient = useQueryClient()

  const {isLoading, isError, error, data: todos} = useQuery("todos", getTodos)

  const addTodoMutation = useMutation(addTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos")
    },
  })

  const deleteTodoMutation = useMutation(deleteTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos")
    },
  })

  const updateTodosMutation = useMutation(updateTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos")
    },
  })

  const handleSubmit = e => {
    e.preventDefaule()
    addTodoMutation.mutate({userId: 1, title: newTodo, completed: false})
    setNewTodo("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a todo</label>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
      />
      <button>Add todo</button>
    </form>
  )
}

export default TodosList
