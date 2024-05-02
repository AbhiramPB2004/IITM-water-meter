import React from "react";
import { useEffect, useState } from "react";  
import io from 'socket.io-client';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./App.css";
// import SendIcon from '@mui/icons-material/Send';
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

const label = { inputProps: { 'aria-label': 'Switch demo' } };




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



function Home() {
  let a = 55;
  const [socket, setSocket] = useState(null);
  const [Humidity, setHumidity] = useState(0);
  const [Temperature, setTemperature] = useState(0);  
  const[Waterflowchart, setwaterflowchart] = useState([]); 
  const[flowRate, setFlowRate] = useState(0);
  const[waterconsumption, setWaterConsumption] = useState(0);
  const[LDR, setLDR] = useState(0); 
  const[soilMoisture, setsoilMoisture] = useState(0); 
  const[connectionstatus, setConnectionStatus] = useState(); 
  const [isToggled, setIsToggled] = useState(false);
  const [switchstate, setSwitchState] = useState(true);
  const[waterconsumptionChart, setWaterConsumptionChart] = useState([]);
  const dataOnSwitch = {"switch": "on"};
  const dataOffSwitch = {"switch": "off"};
  const [weatherapi,setWeather] = useState(); 
  const [Pressure, setPressure] = useState(0);
  
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




  const updateWaterflowchart = (datarecieved) => {
    
    setwaterflowchart(prevFlowchart => [...prevFlowchart, datarecieved]);
    // console.log(Waterflowchart);
  };

  const updateWaterconsumchart = (datarecieved) => {
    
    setWaterConsumptionChart(prevFlowchart => [...prevFlowchart, datarecieved]);
    // console.log(Waterflowchart);
  };

  
  // const generateRandomValue = () => {
  //   return Math.floor(Math.random() * 100);
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const randomValue = generateRandomValue();
  //     updateWaterflowchart({ time: new Date().toLocaleTimeString(), flowrate: randomValue });
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //     console.log("useEffect"); 
  //     const interval = setInterval(() => {
  //       axios.get('http://api.weatherapi.com/v1/current.json', dataOnSwitch).then((response) => { 
  //         console.log(response);
  //       });
  //     }, 60000);
  //     return () => clearInterval(interval);
  //   }, []);

    useEffect(() => {
        try {
            const socketInstance = io('http://localhost:3000');
        setSocket(socketInstance);
        
        
      
        socketInstance.on('connect', () => {
          console.log('Connected to server');
        });
        
        socketInstance.on('humidity', (data) => {
          if(data == null){
            setConnectionStatus("Disconnected")
            setHumidity(0);
          }else{
            setConnectionStatus("Connected")
            setHumidity(data);
          }
          // console.log(`Received message: ${data}`);
        });
        socketInstance.on('temperature', (data) => {
          setTemperature(data);
        // console.log(`Received message: ${data}`);
      });
      socketInstance.on('flowrate', (data) => {
        setFlowRate(data.flowrate);
        updateWaterflowchart(data);
        if(data.flowrate>0 && switchstate == false){
          alert("Water Leak detected");
        }
    });

    socketInstance.on('waterconsumption', (data) => {
      // console.log(data);
      setWaterConsumption(data.waterconsumption);
      updateWaterconsumchart(data);
      // console.log(`Received message: ${data}`);
    }
    );

    socketInstance.on('LDR', (data) => {
      setLDR(data);
      // console.log(`Received message: ${data}`);
    }
    );

    socketInstance.on('SoilMoisture', (data) => {
      setsoilMoisture(data);
      console.log(`Received message: ${data}`);
    }
    );

    socketInstance.on('data', (data) => {
          // console.log(`Received data: ${data}`);
          
    });

        return () => {
            if (socketInstance) {
              console.log("connection alive")
            }else{
                // console.log("connection closed")
            }
          };
            
        } catch (error) {
          // console.log(error);
        }
        
        }, []);
  
        useEffect(() => {
          const fetchData = async () => {
              try {
                  const response = await axios.get('http://api.weatherapi.com/v1/current.json?key=f134c053e6e045eab16130909241804&q=karnataka');
                  setWeather(response.data.current.condition.text);
                  setPressure(response.data.current.pressure_in);
                  
                  console.log(weatherapi);
              } catch (error) {
                  console.log(error);
              }
          };
      
          fetchData();
      
          const interval = setInterval(fetchData, 60000);
          return () => clearInterval(interval);
      }, []);
   
  
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD - {connectionstatus}</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>TEMPERATURE</h3>
            <FaTemperatureLow className="card_icon" />
          </div>
          <h1>{Temperature} C</h1>
        </div>
        
        <div className="card">
          <div className="card-inner">
            <h3>HUMIDITY</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
            
          </div>
          <h1>{Humidity} G/m</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>SUNLIGHT</h3>
            <FaRegSun className="card_icon" />
          </div>
          <h1>{LDR} cd</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>PRESSURE</h3>
            <GiPressureCooker className="card_icon" />
          </div>
          <h1>{Pressure}</h1>
        </div>
        
        

        <div className="card">
          <div className="card-inner">
            <h3>WATER FLOW</h3>
            <GiWaterfall className="card_icon" />
          </div>
          <h1>{flowRate} ml/min</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>TOTAL WATER CONSUMPTION</h3>
            <RiWaterFlashFill className="card_icon" />
          </div>
          <h1>{waterconsumption}L</h1>
        </div>
        
        <div className="card">
          <div className="card-inner">
            <h3>SOIL MOISTURE</h3>
            <BsMoisture className="card_icon" />
          </div>
          <h1>{soilMoisture} Ohm</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>Weather prediction</h3>
            <FaWaterLadder  className="card_icon" />
          </div>
          <h1>{weatherapi}</h1>
        </div>
      

        
        
      </div>
      <FormGroup>
          <FormControlLabel control={<Switch onChange={changeswitch} />} label="Solenoid" />
        </FormGroup>

      {/* <div className="charts"> */}
        {/* <ResponsiveContainer width="100%" height="100%">
        <LineChart
            width={500}
            height={300}
            data={waterconsumptionChart.slice(-10)}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" hide/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="waterconsumption"
              stroke="#8884d8"
              dot={false}
              isAnimationActive={false}
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          {/* </LineChart>
        </ResponsiveContainer> */} 

        

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={900}
            height={300}
            data={Waterflowchart.slice(-100)}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="" />
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <Tooltip />
            <Legend />
            <Line
              type="basisOpen"
              dataKey="flowrate"
              stroke="#8884d8"
              isAnimationActive={false}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="space"></div>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={900}
            height={50}
            data={Waterflowchart.slice(-100)}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="6 6" />
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <Tooltip />
            <Legend />
            <Line
              type="basisOpen"
              dataKey="flowrate"
              stroke="#8884d8"
              isAnimationActive={false}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>


        
            {/* </div> */}
          </main>

        );
}

export default Home;
