
import navigation from "../img/navigation.png";
import pressureImg from  "../img/gauge.png";

export function WeatherInfo({data, weatherIndex}) {

    function getCurrentPlaceDate() {
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        const d = new Date();
        const localTime = d.getTime();
        const localOffset = d.getTimezoneOffset() * 60000;
        const utc = localTime + localOffset;
        const countryUtc = utc + (1000 * data.city.timezone);
        const date = new Date(countryUtc);
        function checking (num) {
            return num < 10 ? "0" + num : num;
        }

        console.log(data);
        return `${month[date.getMonth()]} ${checking(date.getDate())}, ${checking(date.getHours())}:${checking(date.getMinutes())}${date.getHours() >= 12 ? 'pm' : 'am'}`;

    }

    const cityName = data.city.name;
    const country = data.city.country;
    const iconId = data.list[weatherIndex].weather[0].icon;
    const currTemp = data.list[weatherIndex].main.temp.toFixed(0);
    const feelsLike = data.list[weatherIndex].main.feels_like.toFixed(0);
    const weatherDesc = data.list[weatherIndex].weather[0].description.split("")[0].toUpperCase() + data.list[0].weather[0].description.slice(1);
    const windSpeed = data.list[weatherIndex].wind.speed;
    const pressure = data.list[weatherIndex].main.pressure;
    const humidity = data.list[weatherIndex].main.humidity;
    const pop = data.list[weatherIndex].pop * 100;
    const devPoint = currTemp - (100 - humidity)/5;
    const visibility = (data.list[weatherIndex].visibility/1000).toFixed(1)


    function checkWindDirection () {
        let degree = data.list[0].wind.deg;
        const degrees = [
            {
                name: "N",
                min: 348.75,
                max: 11.25,
            },
            {
                name: "NNE",
                min: 11.25,
                max: 33.75,
            },
            {
                name: "NE",
                min: 33.75,
                max: 56.25,
            },
            {
                name: "ENE",
                min: 56.25,
                max: 78.75,
            },
            {
                name: "E",
                min: 78.75,
                max: 101.25,
            },
            {
                name: "ESE",
                min: 101.25,
                max: 123.75,
            },
            {
                name: "SE",
                min: 123.75,
                max: 146.25,
            },
            {
                name: "SSE",
                min: 146.25,
                max: 168.75,
            },
            {
                name: "S",
                min: 168.75,
                max: 191.25,
            },
            {
                name: "SSW",
                min: 191.25,
                max: 213.75,
            },
            {
                name: "SW",
                min: 213.75,
                max: 236.25,
            },
            {
                name: "WSW",
                min: 236.25,
                max: 258.75,
            },
            {
                name: "W",
                min: 258.75,
                max: 281.25,
            },
            {
                name: "WNW",
                min: 281.25,
                max: 303.75,
            },
            {
                name: "NW",
                min: 303.75,
                max: 326.25,
            },
            {
                name: "NNW",
                min: 326.25,
                max: 348.75,
            }
        ];

        for (let i = 0; i < degrees.length; i++) {
            if (i === 0) {
                if (degree > degrees[i].min || degree <= degrees[i].max) {
                    return degrees[i].name;
                }
            } else {
                if (degree > degrees[i].min && degree <= degrees[i].max) {
                    return degrees[i].name;
                }
            }
        }
    }

    function rotateArrow() {
        let degree = data.list[0].wind.deg;
        return (<img style={{transform : `rotate(${degree+180}deg)`, width : "12px", marginRight: "4px"}} src={navigation} alt="way"/>)
    }

    return (
            <div id="weather-info">
                <div id="heart"></div>
                <div className="main-info">
                    <h5 className="full-day">{getCurrentPlaceDate()}</h5>
                    <h2 className="place">{cityName}, {country}</h2>
                    <div className="temp">
                        <img src={`https://openweathermap.org/img/wn/${iconId}@2x.png`} alt="icon"/>
                        <span>{currTemp}°C</span>
                    </div>
                </div>
                <div className="weather-info-box">
                    <h3 className="header-info"><span>Feels Like {feelsLike}°C. </span><span>{weatherDesc}</span></h3>
                    <div className="sec-info">
                        <span>
                            {rotateArrow()} {windSpeed}m/s {checkWindDirection()}
                        </span>
                        <span>
                            <img src={pressureImg} alt="pressure"/>
                            {pressure}hPa
                        </span>
                        <span>
                            Humidity: {humidity}%
                        </span>
                        <span>
                            PoP: {pop}%
                        </span>
                        <span>
                            Dew point: {devPoint}°C
                        </span>
                        <span>
                            Visiblity: {visibility}km
                        </span>
                    </div>
                </div>
            </div>
    )
}