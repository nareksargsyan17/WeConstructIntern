export function AddUser({setData, isClicked, setClicked}) {

    const onAdd = () => {
        if (!isClicked) {
            setClicked(!isClicked);
            setData((oldData) => {
                const dataCopy = [...oldData];
                dataCopy.unshift({
                    id : Math.random() * Date.now(),
                    name : "",
                    email : "",
                    phone : "",
                    isNew : true
                })
                return dataCopy;
            })
        }
    }

    return (
        <button className="add-user" onClick={onAdd}><span>+</span> Add User</button>
    )
}