import {useState} from "react";

export function SetTodo(props) {
    const { setTodos } = props;

    const [value, setValue] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        if (value.trim()) {
            setTodos((oldTodos) =>
                [
                    ...oldTodos,
                    {id: Date.now(), value, isDone: false}
                ]
            );
            setValue("");
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input className="todo-input" type="text" placeholder="Please Enter the Task" value={value} onChange={(e) => setValue(e.target.value)} />
            <button className="todo-button" type="submit">ADD</button>
        </form>
    )
}