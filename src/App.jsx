import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [lugar, setLugar] = useState("");
  const [clima, setClima] = useState("");
  const [aire, setAire] = useState("");
  const [ciudad, setCiudad] = useState("Cordoba");

  const apiKey = 'c7cb38a58f7e2584b62dc90338925cbe';

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

    axios.get(url)
      .then(response => {
        const datos = response.data;
        const { latitud, longitud } = datos.coord;
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
      <h1>Bienvenido a Climator</h1>

      <input 
        type="text" 
        placeholder="pone la ciudad" 
        value={lugar} 
        onChange={buscarLugar}/>

      <button onClick={() => setCiudad(lugar)}>Buscar</button>
      <div>
        {clima && (
          <div>
            <h2>Clima en {clima.name}</h2>
            <p>Temperatura: {clima.main.temp}°C</p>
            <p>Humedad: {clima.main.humidity}%</p>
          </div>
        )}
      </div>

      <div>
        {aire && (
          <div>
            <h2>Calidad del aire</h2>
            <p>Índice de calidad: {aire.list[0].main.aqi}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
