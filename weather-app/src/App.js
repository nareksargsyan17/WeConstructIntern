import logo from './logo.svg';
import './App.css';

function App() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async  function(position) {
      const latitude = position.coords.latitude.toFixed(4);
      const longitude = position.coords.longitude.toFixed(4);
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=436fe5cd8348b41771c808ecc16b25e9`)
          .then(async data => {
            console.log(await data.json())
          })
      await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=gyumri&appid=436fe5cd8348b41771c808ecc16b25e9`)
          .then(async data => {
            console.log(await data.json())
          })
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
