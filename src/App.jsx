import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [lugar, setLugar] = useState("");
  const [clima, setClima] = useState("");
  const [aire, setAire] = useState("");
  const [ciudad, setCiudad] = useState("Cordoba");

  const apiKey = 'c7cb38a58f7e2584b62dc90338925cbe';
  const apikey2 = '77a3bb6ad3714fb1a127c0673d23b946'

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;
    const url2 = `https://api.opencagedata.com/geocode/v1/json?key=${apikey2}&q=52.3877830%2C+9.7334394&pretty=1&no_annotations=1`
    axios.get(url)
      .then(response => {
        const datos = response.data;
        const { latitud , longitud } = datos.coord;
        setClima(datos);

        return axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitud}&lon=${longitud}&appid=${apiKey}`);
      })
      .then(response => {
        setAire(response.data);
      })
      .catch(error => {
        console.error('Error al hacer la solicitud:', error);
      });
  }, [ciudad]);

  const buscarLugar = (event) => {
    setLugar(event.target.value);
  }



  return (
    <>
      <nav>
        <img src="" alt="" />
        <ul className='nav__list'>
          <li className='nav__item'><a className='nav__link'href="#">Contaminacion</a></li>
          <li className='nav__item'><a className='nav__link'href="#">Sobre Nosotros</a></li>
        </ul>
      </nav>
      <h1>Bienvenido a Climator</h1>

      <input 
        type="text" 
        id= "BoxText"
        placeholder="Ingresa una ciudad" 
        value={lugar} 
        onChange={buscarLugar} 
      />

      <button onClick={() => setCiudad(lugar)}>Buscar</button>

      <div>
        {clima && (
          <div id = "hijo">
            <h2>Clima en {clima.name}</h2>
            <p>Temperatura: {clima.main.temp}°C</p>
            <p>Humedad: {clima.main.humidity}%</p>
          </div>
        )}
      </div>
      <div>
        {aire && aire.list && aire.list.length > 0 && (
          <div id = "hijo">
            <h2>calidad del aire</h2>
            <p>indice: {aire.list[0].main.aqi}</p>
            <h3>concentracion de contaminantes:</h3>
            <p>PM2.5: {aire.list[0].components.pm2_5} µg/m³</p>
            <p>PM10: {aire.list[0].components.pm10} µg/m³</p>
            <p>O₃: {aire.list[0].components.o3} µg/m³</p>
            <p>NO₂: {aire.list[0].components.no2} µg/m³</p>
            <p>SO₂: {aire.list[0].components.so2} µg/m³</p>
            <p>CO: {aire.list[0].components.co} µg/m³</p>
          </div>
        )}
      </div>
      <div>
        {clima && (
          <div id = "hijo">
            <h2>Clima en {clima.name}</h2>
            <p>Temperatura: {clima.main.temp}°C</p>
            <p>Humedad: {clima.main.humidity}%</p>
            <p>Velocidad del viento: {clima.wind.speed} m/s</p>
          </div>
        )}
      </div>

    </>
  );
}

export default App;
