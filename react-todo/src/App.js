import './App.css';
import {SetTodo} from "./SetTodo/SetTodo";
import {useState} from "react";
import {TodoItem} from "./TodoItem/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div className="container">
        <h2>ToDo APP</h2>
        <SetTodo setTodos={setTodos} />
        <ul>
          {todos.map((todo) => <TodoItem key={todo.id} todo={todo} setTodos={setTodos} /> )}
        </ul>
    </div>
  );
}

export default App;
