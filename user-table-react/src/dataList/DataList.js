import { useState } from "react";

export function DataList({user, setData, isClicked, setClicked}) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [isActive, setActive] = useState(user.isNew);

    const onEdit = (e) => {
        e.preventDefault();
        if (isClicked === isActive) {
            const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
            if (name && email && phone) {
                if (emailReg.test(email)) {
                    if (isActive) {
                        setData((oldData) => {
                            const dataCopy = [...oldData];
                            const index = dataCopy.findIndex((elem) => elem.id === user.id);
                            dataCopy[index] = {id: user.id, name, email, phone, isNew: false};
                            return dataCopy;
                        })
                    }
                    setActive(!isActive);
                    setClicked(!isClicked);
                } else {
                    alert("Email is not valid");
                }
            } else {
                alert("Please fill all columns");
            }
        }
    };

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePhone = (e) => {
        setPhone(e.target.value);
    };

    const onRemove = () => {
        setData((oldData) => {
            const dataCopy = [...oldData];
            const index = dataCopy.findIndex((elem) => elem.id === user.id);
            if (isActive) {
                setClicked(false);
            }
            dataCopy.splice(index, 1);
            return dataCopy;
        })
    };

    return (
        <tr className="list">
            <td><input className={isActive ? "active-input" : null} type="text" readOnly={!isActive} value={name} onChange={onChangeName} required /></td>
            <td><input className={isActive ? "active-input" : null} type="email" readOnly={!isActive} value={email} onChange={onChangeEmail} required /></td>
            <td><input className={isActive ? "active-input" : null} type="text" readOnly={!isActive} value={phone} onChange={onChangePhone} required /></td>
            <td>
                {isActive ? (
                    <button className="edit active" onClick={onEdit}>Save</button>
                ) : (
                    <button className="edit" onClick={onEdit}>Edit</button>
                )}
                {/*{isActive ?*/}
                {/*    <button className={`edit active`} onClick={onEdit}>Save</button> :*/}
                {/*    <button className={`edit`} onClick={onEdit}>Edit</button>*/}
                {/*}*/}
                {user.isNew ?
                    <button className="remove" onClick={onRemove}>Cancel</button> :
                    <button className="remove" onClick={onRemove}>Remove</button>
                }
            </td>
        </tr>
    )
}