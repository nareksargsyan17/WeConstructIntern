import {useState} from "react";

export function SearchCity({setCity, setLoad}) {
    const [value, setValue] = useState("")


    const onSearch = () => {
        setCity(value);
        setLoad(true);
    }

    return (
        <div className="search-bar">
            <input type="search" value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={onSearch}>Search</button>
        </div>
    )
}