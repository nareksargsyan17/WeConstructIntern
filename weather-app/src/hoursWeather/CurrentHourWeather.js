import {ThemeContext} from "../context/WeatherContext";
import {useContext, useState} from "react";

export function CurrentHourWeather({data, index, checkedHour, isClicked, setClick}) {
    const setWeatherIndex = useContext(ThemeContext);
    const [isActive, setActive] = useState(index);

    console.log(isActive, isClicked)
    const onShowWeather = () => {
        setClick(index);
        setActive(index);
        setWeatherIndex(index);

    }

    return (
        <ul className="hours-box" onClick={onShowWeather} style={{backgroundColor :  isActive === isClicked? "#c4c4c4" : null}}>
            <li>{checkedHour}</li>
            <li>
                <img src={`https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`} alt="icon" style={{width : "60px"}}/>
                {data.list[index].main.temp.toFixed(0)}°C</li>
            <li className="weather-desc">
                {data.list[index].weather[0].description}
            </li>
        </ul>
    )
}