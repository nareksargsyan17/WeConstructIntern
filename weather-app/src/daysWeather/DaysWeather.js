import {CurrentDayWeather} from "./CurrentDayWeather";
import {useState} from "react";

export function DaysWeather({data}) {
    const [isAnyDroped, setAnyDrop] = useState(-1);


    const list = [];
    const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    let min = data.list[0].main.temp_min;
    let max = data.list[0].main.temp_max;
    let index = 0;


    for(let i = 0; i < 40; i++) {
        const day = data.list[i].dt_txt.split("-")[2].split(" ")[0];
        const prevDay = data.list[i-1]?.dt_txt.split("-")[2].split(" ")[0];
        const monthIndex = parseInt(data.list[i].dt_txt.split("-")[1]);
        if (day !== prevDay) {
            const sendData = {
                dayInfo : `${monthArr[monthIndex-1]} ${day}`,
                icon : data.list[index].weather[0].icon,
                max : max.toFixed(0),
                min : min.toFixed(0),
                description : data.list[index].weather[0].description,
                index : i,
                day : day
            }
            list.push(
                <CurrentDayWeather key={i} sendData={sendData} data={data} isAnyDroped={isAnyDroped} setAnyDrop={setAnyDrop}/>
            )
        } else {
            if (data.list[i].main.temp_max > max){
                max = data.list[i].main.temp_max;
            }
            if (data.list[i].main.temp_min < min) {
                min = data.list[i].main.temp_min;
                index = i;
            }
        }

    }

    return (
        <div className="weather-5days">
            {list}
        </div>
    )
}