import './App.css';
import {useEffect, useState} from "react";
import { WeatherInfo } from "./weatherInfo/WeatherInfo";
import {DaysWeather} from "./daysWeather/DaysWeather";
import {ThemeContext} from './context/WeatherContext'
import {SearchCity} from "./searchCity/SearchCity";
import {Favorite} from "./favorite/Favorite";
import {Route, Routes} from "react-router-dom";
import {FavoritePage} from "./favorite/FavoritePage";


function App() {
    const [city, setCity] = useState("");
    const [data, setData] = useState({});
    const [isLoad, setLoad] = useState(true);
    const [weatherIndex, setWeatherIndex] = useState(0);

    useEffect(() => {
        setTimeout(async () => {
            if (city === "") {
                console.log("city", city)

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(async  function(position) {
                        const latitude = position.coords.latitude.toFixed(4);
                        const longitude = position.coords.longitude.toFixed(4);
                        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

                        await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=436fe5cd8348b41771c808ecc16b25e9`)
                            .then(async info => {
                                setData(await info.json());
                                setLoad(false);
                            })
                    })
                } else {
                        console.log("Geolocation is not supported by this browser.");
                    }
            } else {
                await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=436fe5cd8348b41771c808ecc16b25e9`)
                    .then(async info => {
                        if (info.status !== 200) {
                            alert("Not Found");
                            setCity(data.city.name);
                        } else {
                            setData(await info.json());
                            setLoad(false);
                        }
                    })
            }
        }, 1000)
    }, [city])

    return  (
        <section>
            <header>
                <SearchCity setCity={setCity} setLoad={setLoad}/>
                <Routes>
                    <Route path="/favorites" element={<FavoritePage/>}/>
                </Routes>
                <Favorite/>
            </header>
            {!isLoad ? (
                <div id="weather-box">
                    <ThemeContext.Provider value={setWeatherIndex}>
                        <WeatherInfo data={data} weatherIndex={weatherIndex}/>
                        <DaysWeather data={data} setWeatherIndex={setWeatherIndex}/>
                    </ThemeContext.Provider>
                </div>
            ) : (
                <div className="loading">
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}

        </section>
    )
}

export default App;
