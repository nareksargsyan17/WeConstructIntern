

import {CurrentHourWeather} from "./CurrentHourWeather";
import {useState} from "react";

export function HoursWeather({data, index}) {
    const [isClicked, setClick] = useState(-1);
    const hoursList = [];
    let hour = parseInt(data.list[index]?.dt_txt.split("-")[2].split(" ")[1].split(":")[0]);

    while (hour <= 21 && data.list[index]) {
        hour = parseInt(data.list[index].dt_txt.split("-")[2].split(" ")[1].split(":")[0]);
        let checkedHour = hour < 12 ? hour + "am" : hour + "pm";
        hoursList.push(
            <CurrentHourWeather key={index} data={data} index={index} checkedHour={checkedHour} isClicked={isClicked} setClick={setClick}/>
            )
        if (hour === 21) {
            break;
        }
        index++;
    }
    return (
        <div>
            {hoursList}
        </div>
    )
}
