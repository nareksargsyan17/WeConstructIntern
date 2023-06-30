import dropDown from "../img/down.png";
import {useState} from "react";
import {HoursWeather} from "../hoursWeather/HoursWeather";

export function CurrentDayWeather ({sendData, data, isAnyDroped, setAnyDrop}) {
    const [isDroped, setDrop] = useState(sendData.day);
    const [isClicked, setClick] = useState(true);

    const onToggle = () => {
        if (isAnyDroped === isDroped) {
            setClick(!isClicked);
        }
        setDrop(sendData.day);
        setAnyDrop(sendData.day);
    }

    return (
        <div className="day-box" >
            <ul className="day-row"  onClick={onToggle} style={{backgroundColor : isClicked && isDroped === isAnyDroped ? "#c4c4c4" : null}}>
                <li>{sendData.dayInfo}</li>
                <li>
                    <img src={`https://openweathermap.org/img/wn/${sendData.icon}@2x.png`} alt="icon" style={{width : "60px"}}/>
                    {sendData.min}/{sendData.max}°C</li>
                <li className="weather-desc">
                    {sendData.description}
                    <img src={dropDown} alt="dropDown" style={{transform : isClicked && isDroped === isAnyDroped ? "rotate(180deg)" : "rotate(0deg)"}}/>
                </li>
            </ul>
            {isClicked && isDroped === isAnyDroped? <HoursWeather data={data} index={sendData.index} />  : null}
        </div>
    )
}