export function HeaderBar({mainList, list, setList}) {
    const count = list.filter((elem) => elem.value > 0).length;

    const onRefresh = () => {
        setList((oldList) => {
            let listCopy = [...oldList];
            listCopy = listCopy.map((elem) => {
                elem.value = 0;
                return elem;
            })
            return listCopy;
        })
    }

    const onRestore = () => {
        if (list.length) {
            setList(mainList);
        }
    }

    return (
        <div className="header-bar">
            <div className="count">{count > 1 ? `${count} Items` : `${count} Item`}</div>
            <div className="refresh" onClick={onRefresh}>Refresh</div>
            <div className="restore" style={list.length > 0 ? {cursor : "not-allowed"} : {cursor: "pointer"}} onClick={onRestore} >Restore</div>
        </div>
    )
}