export function ListItem({elem, setList}) {
    const {id, value} = elem;

    const onPlusNum = () => {
        setList((oldList) => {
            const listCopy = [...oldList];
            const index = listCopy.findIndex((item) => item.id === id);
            listCopy[index].value++;
            return listCopy;
        })
    }

    const onMinusNum = () => {
        if (value > 0) {
            setList((oldList) => {
                const listCopy = [...oldList];
                const index = listCopy.findIndex((item) => item.id === id);
                listCopy[index].value--;
                return listCopy;
            })
        }
    }

    const onRemove = () => {
        setList((oldList) => {
            const listCopy = [...oldList];
            const index = listCopy.findIndex((item) => item.id === id);
            listCopy.splice(index, 1);
            return listCopy;
        })
    }

    return (
        <ul className="list-item">
            <li className="number">{value}</li>
            <li className="plus" onClick={onPlusNum}>+</li>
            <li className="minus" style={value === 0 ? {cursor: "not-allowed"} : {cursor: "auto"}} onClick={onMinusNum}>-</li>
            <li className="remove" onClick={onRemove}>x</li>
        </ul>
    )
}