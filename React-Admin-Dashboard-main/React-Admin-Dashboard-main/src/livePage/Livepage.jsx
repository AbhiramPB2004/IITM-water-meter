import React from "react";
import { useEffect, useState } from "react";  
import io from 'socket.io-client';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./App.css";
import { GiHazardSign }
 

from "react-icons/gi";
import ReactDOM from "react-dom";
// import sdk from '@api/climacell-docs';

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
// import sdk from '@api/climacell-docs';




import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsMoisture,
} from "react-icons/bs";
import { FaToggleOn } from "react-icons/fa6";
import { FaRegSun } from "react-icons/fa";
import { GiPressureCooker } from "react-icons/gi";
import { GiWaterfall } from "react-icons/gi";
import { RiWaterFlashFill } from "react-icons/ri";
import { FaWaterLadder } from "react-icons/fa6";
import { FaTemperatureLow } from "react-icons/fa";
import axios from 'axios';

import Switch from '@mui/material/Switch';
const date = new Date();  
const label = { inputProps: { 'aria-label': 'Switch demo' } };

// sdk.auth('SzkQ7ii9uI7d6JvpopEYmvK3iRIwIILr');
// sdk.weatherForecast({location: 'Karnataka', timesteps: ''})
//   .then(({ data }) => console.log(data))
//   .catch(err => console.error(err));





function Livepage() {
  let a = 55;
  const [socket, setSocket] = useState(null);
  const[tempgraph,seTempgraph] = useState([]);
  const [windDirection, setWindDirection] = useState(0);    
  const [Precipitaion, setPrecipitation] = useState(0);
  const [WindSpeed, setWindspeed] = useState(0);  
  const[Visibility, setVisibility] = useState(0);
  const[Waterflowchart, setwaterflowchart] = useState([]); 
  const[UV, setUV] = useState(0);
  const[waterconsumption, setWaterConsumption] = useState(0);
  const[cloud, setCloud] = useState(); 
  const[soilMoisture, setsoilMoisture] = useState(); 
  const[connectionstatus, setConnectionStatus] = useState(); 
  const [isToggled, setIsToggled] = useState(false);
  const [switchstate, setSwitchState] = useState(true);
  const[waterconsumptionChart, setWaterConsumptionChart] = useState([]);
  const[FeelsLike, setFeelsLike] = useState(0);
  const dataOnSwitch = {"switch": "on"};
  const dataOffSwitch = {"switch": "off"};
  const [weatherapi,setWeather] = useState();  
  const [GustS, setGustS] = useState(0);
  const[historicalweather, setHistoricalWeather] = useState([]);
  const changeswitch = () => {
    console.log("switch changed");
    if(switchstate == true){
      
      axios.post('http://localhost:8000/', dataOnSwitch).then((response) => {
        console.log(response);
      }
      );
      setSwitchState(false)
    }
    else{
      axios.post('http://localhost:8000/', dataOffSwitch).then((response) => {
        console.log(response);
      }
      );
      setSwitchState(true)
    }
   
    
  }

  // axios.post('http://api.weatherapi.com/v1/current.json?key=f134c053e6e045eab16130909241804&q=karnataka', dataOnSwitch).then((response) => { 
  //   setWeather(response.data.current.condition.text);
  //   console.log(response);
  // }
  // );




  
useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://api.weatherapi.com/v1/current.json?key=f134c053e6e045eab16130909241804&q=karnataka');
            setWeather(response.data.current.condition.text);
            setWindspeed(response.data.current.wind_kph);
            setWindDirection(response.data.current.wind_dir);
            setPrecipitation(response.data.current.precip_mm);
            setCloud(response.data.current.cloud);
            setVisibility(response.data.current.vis_km);
            setUV(response.data.current.uv);
            setGustS(response.data.current.gust_kph);
            setFeelsLike(response.data.current.feelslike_c); 
            const showTime = date.getHours() 
            + ':' + date.getMinutes() 
            + ":" + date.getSeconds();
            seTempgraph({"time": showTime, "consumption": response.data.current.temp_c});
            
        } catch (error) {
            console.log(error);
        }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
}, []);


  
        
  // useEffect(() => {
  //     const interval = setInterval(() => {
  //       axios.get('http://api.weatherapi.com/v1/current.json?key=f134c053e6e045eab16130909241804&q=karnataka').then((response) => {
  //       setWeather(response.data.current.condition.text);
  //       console.log(weatherapi);
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  //     }, 60000);
  //     return () => clearInterval(interval);
  //   }, []);
   
  
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD - {connectionstatus}</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Wind speed</h3>
            <FaTemperatureLow className="card_icon" />
          </div>
          <h1>{WindSpeed} Kph</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>wind direction</h3>
            <FaTemperatureLow className="card_icon" />
          </div>
          <h1>{windDirection}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Precipitation</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
            
          </div>
          <h1>{Precipitaion} mm</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Cloud</h3>
            <FaRegSun className="card_icon" />
          </div>
          <h1>{cloud} </h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Visibility</h3>
            <GiPressureCooker className="card_icon" />
          </div>
          <h1>{Visibility} km</h1>
        </div>
        
        

        <div className="card">
          <div className="card-inner">
            <h3>UV index</h3>
            <GiWaterfall className="card_icon" />
        </div>
        <h1>{UV} mW/m<sup>2</sup> </h1>
        </div>
        <div className="card">
        <div className="card-inner">
            <h3>GUST speed</h3>
            <RiWaterFlashFill className="card_icon" />
        </div>
        <h1>{GustS} kph</h1>
        </div>
        
        <div className="card">
        <div className="card-inner">
            <h3>Feels like Temp</h3>
            <BsMoisture className="card_icon" />
        </div>
        <h1>{FeelsLike} C</h1>
        </div>
        </div>

        
        <div className="graph-container">
          <h3>Temperature graph</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tempgraph}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="consumption" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
    
    </main>

        );
}

export default Livepage;
