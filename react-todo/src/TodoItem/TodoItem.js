
export function TodoItem({todo, setTodos}) {
    const {id, value, isDone} = todo;

    const onCheck = () => {
        setTodos((oldTodos) => {
            const todosCopy = [...oldTodos];
            const index = todosCopy.findIndex((elem) => elem.id === id);
            todosCopy[index].isDone = !isDone;
            return todosCopy;
        });
    }

    const onDelete = () => {
        setTodos((oldTodos) => {
            const todosCopy = [...oldTodos];
            const index = todosCopy.findIndex((elem) => elem.id === id);
            todosCopy.splice(index, 1);
            return todosCopy
        });
    }

    return (
        <li>
            <label className="label">
                <input type="checkbox" onChange={onCheck}/>
            </label>
            <p className="todo-text">{value}</p>
            <button onClick={onDelete} className="del">Remove</button>
        </li>
    )
}